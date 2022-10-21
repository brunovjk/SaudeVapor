import React, { useState, useEffect } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { Grid } from '@material-ui/core';
import { SectionHeader } from '../../../../components/molecules';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import CandyMachine from './CandyMachine';

const useStyles = makeStyles(() => ({
    button: {
        color: '#fff',
        background: '#5693F5',
    },
}));

function CandyMachineSection() {
    const { t } = useTranslation();
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
        <Grid container spacing={4}>
            <Grid item container justify="center" alignItems="center" xs={12} md={6} data-aos="fade-up">
                <CandyMachine />
            </Grid>
            <Grid item container justify="center" alignItems="center" xs={12} md={6} data-aos="fade-up">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <SectionHeader
                            title={
                                <span>
                                    {t('Blockchain.Hub.title1')}
                                    <br />
                                    <Typography component="span" variant="inherit" color="primary">
                                        {t('Blockchain.Hub.title2')}
                                    </Typography>
                                </span>
                            }
                            subtitle={t('Blockchain.Hub.subtitle')}
                            label={t('Blockchain.Hub.label')}
                            align="left"
                            fadeUp
                            titleVariant="h4"
                            ctaGroup={[
                                <WalletMultiButton className={classes.button}>
                                    {walletAddress
                                        ? t('Blockchain.Hub.connectedBbutton')
                                        : t('Blockchain.Hub.connectBbutton')}
                                </WalletMultiButton>,
                            ]}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default CandyMachineSection;
