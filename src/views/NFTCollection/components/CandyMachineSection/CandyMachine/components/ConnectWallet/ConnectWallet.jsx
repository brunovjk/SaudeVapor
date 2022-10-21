import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Context } from '../../../../../../../context/Context';
import { Image } from '../../../../../../../components/atoms';

const useStyles = makeStyles((theme) => ({
    root: {},
    image: {
        boxShadow: '25px 60px 125px -25px rgba(80,102,144,.1), 16px 40px 75px -40px rgba(0,0,0,.2)',
        borderRadius: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            maxWidth: 500,
        },
    },
}));
export default function ConnectWallet() {
    const classes = useStyles();
    const { selectedLanguage } = useContext(Context);
    const [src, setSrc] = useState('/images/illustrations/connect_wallet_en.png');

    useEffect(() => {
        if (selectedLanguage === 'pt') {
            setSrc('/images/illustrations/connect_wallet_pt.png');
        } else {
            setSrc('/images/illustrations/connect_wallet_en.png');
        }
    }, [selectedLanguage]);

    return <Image src={src} alt="Discover, Collect and Learn with our Extraordinary NFTs" className={classes.image} />;
}
