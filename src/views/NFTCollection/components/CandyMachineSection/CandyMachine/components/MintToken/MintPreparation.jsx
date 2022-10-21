import { useCallback, useEffect, useMemo, useState } from 'react';
import * as anchor from '@project-serum/anchor';

import { Snackbar } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Connection, PublicKey } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import { MintButton } from './MintButton';
import { GatewayProvider } from '@civic/solana-gateway-react';
import {
    awaitTransactionSignatureConfirmation,
    CANDY_MACHINE_PROGRAM,
    createAccountsForMint,
    getCandyMachineState,
    getCollectionPDA,
    mintOneToken,
} from './candy-machine';
import { useTranslation } from 'react-i18next';
import { formatNumber, getAtaForMint } from './utils';

const MintPreparation = (props) => {
    const { t } = useTranslation();

    const [isUserMinting, setIsUserMinting] = useState(false);
    const [candyMachine, setCandyMachine] = useState();
    const [alertState, setAlertState] = useState({
        open: false,
        message: '',
        severity: undefined,
    });

    const [isActive, setIsActive] = useState(false);
    const [itemsRemaining, setItemsRemaining] = useState();
    const [isValidBalance, setIsValidBalance] = useState(false);
    const [needTxnSplit, setNeedTxnSplit] = useState(true);
    const [setupTxn, setSetupTxn] = useState();

    const rpcUrl = props.rpcHost;
    const wallet = useWallet();
    const cluster = props.network;
    const anchorWallet = useMemo(() => {
        if (!wallet || !wallet.publicKey || !wallet.signAllTransactions || !wallet.signTransaction) {
            return;
        }

        return {
            publicKey: wallet.publicKey,
            signAllTransactions: wallet.signAllTransactions,
            signTransaction: wallet.signTransaction,
        };
    }, [wallet]);

    const refreshCandyMachineState = useCallback(
        async (commitment = 'confirmed') => {
            if (!anchorWallet) {
                return;
            }
            if (props.error !== undefined) {
                setAlertState({
                    open: true,
                    message: props.error,
                    severity: 'error',
                    hideDuration: null,
                });
                return;
            }

            const connection = new Connection(props.rpcHost, commitment);

            if (props.candyMachineId) {
                try {
                    const cndy = await getCandyMachineState(anchorWallet, props.candyMachineId, connection);
                    console.log('Candy machine state: ', cndy);
                    let active = cndy?.state.goLiveDate
                        ? cndy?.state.goLiveDate.toNumber() < new Date().getTime() / 1000
                        : false;

                    // duplication of state to make sure we have the right values!
                    const userPrice = cndy.state.price;

                    if (cndy?.state.tokenMint) {
                        // retrieves the SPL token
                        const mint = new anchor.web3.PublicKey(cndy.state.tokenMint);
                        const token = (await getAtaForMint(mint, anchorWallet.publicKey))[0];
                        try {
                            const balance = await connection.getTokenAccountBalance(token);

                            const valid = new anchor.BN(balance.value.amount).gte(userPrice);

                            // only allow user to mint if token balance >  the user if the balance > 0
                            setIsValidBalance(valid);
                            active = active && valid;
                        } catch (e) {
                            setIsValidBalance(false);
                            active = false;
                            // no whitelist user, no mint
                            console.log('There was a problem fetching SPL token balance');
                            console.log(e);
                        }
                    } else {
                        const balance = new anchor.BN(await connection.getBalance(anchorWallet.publicKey));
                        const valid = balance.gte(userPrice);
                        setIsValidBalance(valid);
                        active = active && valid;
                    }

                    // amount to stop the mint?
                    if (cndy?.state.endSettings?.endSettingType.amount) {
                        const limit = Math.min(cndy.state.endSettings.number.toNumber(), cndy.state.itemsAvailable);
                        if (cndy.state.itemsRedeemed < limit) {
                            setItemsRemaining(limit - cndy.state.itemsRedeemed);
                        } else {
                            setItemsRemaining(0);
                            cndy.state.isSoldOut = true;
                        }
                    } else {
                        setItemsRemaining(cndy.state.itemsRemaining);
                    }

                    if (cndy.state.isSoldOut) {
                        active = false;
                    }

                    const [collectionPDA] = await getCollectionPDA(props.candyMachineId);
                    const collectionPDAAccount = await connection.getAccountInfo(collectionPDA);

                    setIsActive((cndy.state.isActive = active));
                    setCandyMachine(cndy);

                    const txnEstimate =
                        892 +
                        (!!collectionPDAAccount && cndy.state.retainAuthority ? 182 : 0) +
                        (cndy.state.tokenMint ? 66 : 0) +
                        (cndy.state.whitelistMintSettings ? 34 : 0) +
                        (cndy.state.whitelistMintSettings?.mode?.burnEveryTime ? 34 : 0) +
                        (cndy.state.gatekeeper ? 33 : 0) +
                        (cndy.state.gatekeeper?.expireOnUse ? 66 : 0);

                    setNeedTxnSplit(txnEstimate > 1230);
                } catch (e) {
                    if (e instanceof Error) {
                        if (e.message === `Account does not exist ${props.candyMachineId}`) {
                            setAlertState({
                                open: true,
                                message: `Couldn't fetch candy machine state from candy machine with address: ${props.candyMachineId}, using rpc: ${props.rpcHost}! You probably typed the REACT_APP_CANDY_MACHINE_ID value in wrong in your .env file, or you are using the wrong RPC!`,
                                severity: 'error',
                                hideDuration: null,
                            });
                        } else if (e.message.startsWith('failed to get info about account')) {
                            setAlertState({
                                open: true,
                                message: `Couldn't fetch candy machine state with rpc: ${props.rpcHost}! This probably means you have an issue with the REACT_APP_SOLANA_RPC_HOST value in your .env file, or you are not using a custom RPC!`,
                                severity: 'error',
                                hideDuration: null,
                            });
                        }
                    } else {
                        setAlertState({
                            open: true,
                            message: `${e}`,
                            severity: 'error',
                            hideDuration: null,
                        });
                    }
                    console.log(e);
                }
            } else {
                setAlertState({
                    open: true,
                    message: `Your REACT_APP_CANDY_MACHINE_ID value in the .env file doesn't look right! Make sure you enter it in as plain base-58 address!`,
                    severity: 'error',
                    hideDuration: null,
                });
            }
        },
        [anchorWallet, props.candyMachineId, props.error, props.rpcHost]
    );

    const onMint = async (beforeTransactions = [], afterTransactions = []) => {
        try {
            setIsUserMinting(true);
            if (wallet.connected && candyMachine?.program && wallet.publicKey) {
                let setupMint = undefined;
                if (needTxnSplit && setupTxn === undefined) {
                    setAlertState({
                        open: true,
                        message: t('Blockchain.MintPreparation.msg1'),
                        severity: 'info',
                    });
                    setupMint = await createAccountsForMint(candyMachine, wallet.publicKey);
                    let status = { err: true };
                    if (setupMint.transaction) {
                        status = await awaitTransactionSignatureConfirmation(
                            setupMint.transaction,
                            props.txTimeout,
                            props.connection,
                            true
                        );
                    }
                    if (status && !status.err) {
                        setSetupTxn(setupMint);
                        setAlertState({
                            open: true,
                            message: t('Blockchain.MintPreparation.msg2'),
                            severity: 'info',
                        });
                    } else {
                        setAlertState({
                            open: true,
                            message: t('Blockchain.MintPreparation.msg3'),
                            severity: 'error',
                        });
                        setIsUserMinting(false);
                        return;
                    }
                } else {
                    setAlertState({
                        open: true,
                        message: t('Blockchain.MintPreparation.msg4'),
                        severity: 'info',
                    });
                }

                const mintResult = await mintOneToken(
                    candyMachine,
                    wallet.publicKey,
                    beforeTransactions,
                    afterTransactions,
                    setupMint ?? setupTxn
                );
                props.setTokenAddress(mintResult.tokenAddress);

                let status = { err: true };
                let metadataStatus = null;
                if (mintResult) {
                    status = await awaitTransactionSignatureConfirmation(
                        mintResult.mintTxId,
                        props.txTimeout,
                        props.connection,
                        true
                    );

                    metadataStatus = await candyMachine.program.provider.connection.getAccountInfo(
                        mintResult.metadataKey,
                        'processed'
                    );
                    console.log('Metadata status: ', !!metadataStatus);
                }

                if (status && !status.err && metadataStatus) {
                    // manual update since the refresh might not detect
                    // the change immediately
                    const remaining = itemsRemaining - 1;
                    setItemsRemaining(remaining);
                    setIsActive((candyMachine.state.isActive = remaining > 0));
                    candyMachine.state.isSoldOut = remaining === 0;
                    setSetupTxn(undefined);
                    setAlertState({
                        open: true,
                        message: t('Blockchain.MintPreparation.msg5'),
                        severity: 'success',
                        hideDuration: 7000,
                    });
                    refreshCandyMachineState('processed');
                } else if (status && !status.err) {
                    setAlertState({
                        open: true,
                        message: t('Blockchain.MintPreparation.msg6'),
                        severity: 'error',
                        hideDuration: 8000,
                    });
                    refreshCandyMachineState();
                } else {
                    setAlertState({
                        open: true,
                        message: t('Blockchain.MintPreparation.msg3'),
                        severity: 'error',
                    });
                    refreshCandyMachineState();
                }
            }
        } catch (error) {
            let message = error.msg || t('Blockchain.MintPreparation.msg3');
            if (!error.msg) {
                if (!error.message) {
                    message = t('Blockchain.MintPreparation.msg7');
                } else if (error.message.indexOf('0x137')) {
                    console.log(error);
                    message = t('Blockchain.MintPreparation.msg8');
                } else if (error.message.indexOf('0x135')) {
                    message = `Insufficient funds to mint. Please fund your wallet.`;
                }
            } else {
                if (error.code === 311) {
                    console.log(error);
                    message = t('Blockchain.MintPreparation.msg8');
                    window.location.reload();
                } else if (error.code === 312) {
                    message = t('Blockchain.MintPreparation.msg8');
                }
            }

            setAlertState({
                open: true,
                message,
                severity: 'error',
            });
            // updates the candy machine state to reflect the latest
            // information on chain
            refreshCandyMachineState();
        } finally {
            setIsUserMinting(false);
        }
    };

    useEffect(() => {
        refreshCandyMachineState();
    }, [anchorWallet, props.candyMachineId, props.connection, refreshCandyMachineState]);

    return (
        <>
            <Paper
                style={{
                    padding: 12,
                    borderRadius: 6,
                }}
                variant="outlined"
            >
                {wallet.connected && candyMachine && (
                    <Grid container direction="row" justifyContent="space-between" wrap="nowrap">
                        <Grid item xs={6}>
                            {candyMachine?.state.isActive &&
                            candyMachine?.state.gatekeeper &&
                            wallet.publicKey &&
                            wallet.signTransaction ? (
                                <GatewayProvider
                                    wallet={{
                                        publicKey: wallet.publicKey || new PublicKey(CANDY_MACHINE_PROGRAM),
                                        //@ts-ignore
                                        signTransaction: wallet.signTransaction,
                                    }}
                                    gatekeeperNetwork={candyMachine?.state?.gatekeeper?.gatekeeperNetwork}
                                    clusterUrl={rpcUrl}
                                    cluster={cluster}
                                    options={{ autoShowModal: false }}
                                >
                                    <MintButton
                                        candyMachine={candyMachine}
                                        isMinting={isUserMinting}
                                        setIsMinting={(val) => setIsUserMinting(val)}
                                        onMint={onMint}
                                        isActive={isActive}
                                    />
                                </GatewayProvider>
                            ) : (
                                <MintButton
                                    candyMachine={candyMachine}
                                    isMinting={isUserMinting}
                                    setIsMinting={(val) => setIsUserMinting(val)}
                                    onMint={onMint}
                                    isActive={isActive || isValidBalance}
                                />
                            )}
                        </Grid>
                        <Grid container item xs={6} direction="row" justifyContent="space-evenly" alignItems="center">
                            <Grid item>
                                <Typography variant="body2" color="primary">
                                    {t('Blockchain.MintPreparation.remaining')}
                                </Typography>
                                <Typography
                                    variant="h6"
                                    color="textPrimary"
                                    style={{
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {`${itemsRemaining}`}/49
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2" color="primary">
                                    {t('Blockchain.MintPreparation.price')}
                                </Typography>
                                <Typography variant="h6" color="textPrimary" style={{ fontWeight: 'bold' }}>
                                    {`◎ ${formatNumber.asNumber(candyMachine.state.price)}`}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                )}
            </Paper>
            <Snackbar
                open={alertState.open}
                autoHideDuration={alertState.hideDuration === undefined ? 6000 : alertState.hideDuration}
                onClose={() => setAlertState({ ...alertState, open: false })}
            >
                <Alert onClose={() => setAlertState({ ...alertState, open: false })} severity={alertState.severity}>
                    {alertState.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default MintPreparation;
