import { useWallet } from '@solana/wallet-adapter-react';
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { MintToken, ConnectWallet } from './components';

const useStyles = makeStyles((theme) => ({
    root: {},
}));

export default function CandyMachine(props) {
    const { className, ...rest } = props;
    const classes = useStyles();

    const { publicKey } = useWallet();

    const [walletAddress, setWalletAddress] = useState(null);

    useEffect(() => {
        if (publicKey) {
            setWalletAddress(publicKey.toString());
        } else {
            setWalletAddress(null);
        }
    }, [publicKey]);

    return (
        <div className={clsx(classes.root, className)} {...rest}>
            {walletAddress ? (
                <Paper>
                    <MintToken />
                </Paper>
            ) : (
                <ConnectWallet />
            )}
        </div>
    );
}
