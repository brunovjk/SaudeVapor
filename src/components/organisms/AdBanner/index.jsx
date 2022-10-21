import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Grid, Paper, Button } from '@material-ui/core';
import { Image } from '../../atoms';
import { SectionHeader } from '../../molecules';

const useStyles = makeStyles((theme) => ({
    root: {
        marginBlock: '64px',
        [theme.breakpoints.down('sm')]: {
            marginBlock: '32px',
        },
    },
    button: {
        marginBottom: '8px',
    },
    background: {
        background: theme.palette.alternate.main,
    },
}));

const AdBanner = (props) => {
    const { data, className, ...rest } = props;
    const { t } = useTranslation();
    const classes = useStyles();

    const theme = useTheme();
    const isMd = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true,
    });

    return (
        <div className={clsx(classes.root, className)} {...rest}>
            <Grid container spacing={isMd ? 4 : 2}>
                <Grid item xs={12} data-aos="fade-up">
                    <Paper elevation={3} className={classes.background}>
                        <SectionHeader
                            title={t('AdBanner.title')}
                            subtitle={t('AdBanner.subtitle')}
                            label={t('AdBanner.label')}
                            ctaGroup={[
                                // nfts.map((item, index) => (
                                <>
                                    <Image
                                        // key={index}
                                        src="https://arweave.net/shOcFyfIxLyb6RCEPtQiNKMAzEuRQhYvc-FcKS3PU4s?ext=png"
                                        lazy={true}
                                    />
                                    <Image
                                        // key={index}
                                        src="https://arweave.net/JX0-QEySBfX8a72LJ3kGd0i2UyMYKx6Z2jHaU4UA814?ext=png"
                                        lazy={true}
                                    />
                                </>,
                                <>
                                    <Image
                                        // key={index}
                                        src="https://arweave.net/H5z7SkeEU0Bv7EDoq2CXwxDIq8C3tWd80dKkYb7iE4A?ext=png"
                                        lazy={true}
                                    />
                                    <Image
                                        // key={index}
                                        src="https://arweave.net/Xmel-b4GWtW8G-uPezocpAtEPtQneQP4yk41O24psQA?ext=png"
                                        lazy={true}
                                    />
                                </>,
                                <>
                                    <Image
                                        // key={index}
                                        src="https://arweave.net/YYDw5mgr3A0FCuOyLB9eEOtElFi5vpxDBiQv3n4Af5s?ext=png"
                                        lazy={true}
                                    />
                                    <Image
                                        // key={index}
                                        src="https://arweave.net/-z-HBnNRoHH18SgwAQOXs3Qk20bNG9f6gqWhxvbS2P8?ext=png"
                                        lazy={true}
                                    />
                                </>,

                                // )),
                            ]}
                            disableGutter
                            align="center"
                            fadeUp
                            titleVariant="h6"
                            subtitleVariant="body1"
                        />
                        <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    size="large"
                                    className={classes.button}
                                    component="a"
                                    href="/nft-collection"
                                >
                                    {t('Home.Hub.button')}
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

AdBanner.propTypes = {
    /**
     * External classes
     */
    className: PropTypes.string,
    /**
     * data to be rendered
     */
    data: PropTypes.array.isRequired,
};

export default AdBanner;
