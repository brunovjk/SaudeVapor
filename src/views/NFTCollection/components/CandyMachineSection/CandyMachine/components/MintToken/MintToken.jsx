import * as anchor from '@project-serum/anchor';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { useConnection } from '@solana/wallet-adapter-react';
import MintPreparation from './MintPreparation';
import { Image } from '../../../../../../../components/atoms';
import { CardBase, ImageToken } from '../../../../../../../components/organisms';
import { Box } from '@material-ui/core';

import { DEFAULT_TIMEOUT } from './connection';

const useStyles = makeStyles((theme) => ({
    root: {},
    mintSection: {
        width: '100%',
        margin: '24px 0px -24px 0px ',
        [theme.breakpoints.down('sm')]: {
            margin: '16px 0px -16px 0px ',
        },
    },
    imgToken: {
        width: 380,
        height: 380,
        borderRadius: theme.spacing(1),
        margin: '-16px 0px 0px 0px ',
        [theme.breakpoints.down('sm')]: {
            width: 300,
            height: 300,
            margin: '-8px 0px 0px 0px ',
        },
    },
}));

const getCandyMachineId = () => {
    try {
        return new anchor.web3.PublicKey(process.env.REACT_APP_CANDY_MACHINE_ID);
    } catch (e) {
        console.log('Failed to construct CandyMachineId', e);
        return undefined;
    }
};

let error = undefined;

export default function MintToken(props) {
    const { className, ...rest } = props;
    const classes = useStyles();

    const candyMachineId = getCandyMachineId();
    const network = WalletAdapterNetwork.Devnet;
    const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST ?? anchor.web3.clusterApiUrl('devnet');
    const { connection } = useConnection();

    const [tokenAddress, setTokenAddress] = useState(null);

    return (
        <div className={clsx(classes.root, className)} {...rest}>
            <CardBase>
                <Box className={classes.imgToken}>
                    {tokenAddress ? (
                        <ImageToken tokenAddress={tokenAddress} />
                    ) : (
                        <Image src="/images/illustrations/base1.png" alt="Cannabis Compounds Collection" />
                    )}
                </Box>

                <Box className={classes.mintSection}>
                    <MintPreparation
                        candyMachineId={candyMachineId}
                        connection={connection}
                        txTimeout={DEFAULT_TIMEOUT}
                        rpcHost={rpcHost}
                        network={network}
                        error={error}
                        setTokenAddress={setTokenAddress}
                    />
                </Box>
            </CardBase>
        </div>
    );
}
