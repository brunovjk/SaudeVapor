// import { useWallet } from '@solana/wallet-adapter-react';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { colors } from '@material-ui/core';
import { Section } from '../../components/organisms';
import { Hero, CandyMachineSection, MintedTokens } from './components';

const useStyles = makeStyles((theme) => ({
    root: {
        background: theme.palette.alternate.main,

        height: '100%',
        width: '100%',
    },
    pagePaddingTop: {
        paddingTop: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            paddingTop: theme.spacing(5),
        },
    },
    sectionNoPaddingTop: {
        paddingTop: 0,
    },
    shape: {
        background: theme.palette.common.white,
        borderBottomRightRadius: '50%',
        borderBottom: `1px solid ${colors.grey[200]}`,
    },
}));

const NFTCollection = () => {
    const classes = useStyles();
    // const { publicKey } = useWallet();

    // const [walletAddress, setWalletAddress] = useState(null);

    // useEffect(() => {
    //     if (publicKey) {
    //         setWalletAddress(publicKey.toString());
    //     } else {
    //         setWalletAddress(null);
    //     }
    // }, [publicKey]);
    return (
        <div className={classes.root}>
            <div className={classes.shape}>
                <Section className={classes.pagePaddingTop}>
                    <Hero />
                </Section>
                <Section className={classes.sectionNoPaddingTop}>
                    <CandyMachineSection />
                </Section>
            </div>
            {/* {walletAddress ? ( */}
            <Section>
                <MintedTokens />
            </Section>
            {/* ) : (
                 <Section>
                     <MintedTokens />
                 </Section>
             )} */}
        </div>
    );
};

export default NFTCollection;
