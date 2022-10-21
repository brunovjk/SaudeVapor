import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button } from '@material-ui/core';
import { Image } from '../../../../components/atoms';
import { SectionHeader } from '../../../../components/molecules';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    placementGrid: {
        display: 'flex',
    },
    placementGridItemMiddle: {
        margin: `0 ${theme.spacing(3)}px`,
    },
    coverImage: {
        boxShadow: '25px 60px 125px -25px rgba(80,102,144,.1), 16px 40px 75px -40px rgba(0,0,0,.2)',
        borderRadius: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            maxWidth: 500,
        },
    },
}));

const Features = (props) => {
    const { t } = useTranslation();

    const { className, ...rest } = props;
    const classes = useStyles();

    return (
        <div className={clsx(classes.root, className)} {...rest}>
            <Grid container spacing={4}>
                <Grid item container justify="flex-start" alignItems="center" xs={12} md={6} data-aos="fade-up">
                    <Image
                        src="/images/illustrations/collection.png"
                        alt="..."
                        className={classes.coverImage}
                        data-aos="flip-left"
                        data-aos-easing="ease-out-cubic"
                        data-aos-duration="2000"
                    />
                </Grid>
                <Grid item container justify="center" alignItems="center" xs={12} md={6} data-aos="fade-up">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <SectionHeader
                                title={
                                    <span>
                                        {t('Home.Hub.title1')}
                                        <br />
                                        <Typography component="span" variant="inherit" color="primary">
                                            {t('Home.Hub.title2')}
                                        </Typography>
                                    </span>
                                }
                                subtitle={t('Home.Hub.subtitle')}
                                ctaGroup={[
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        size="large"
                                        component="a"
                                        href="/nft-collection"
                                    >
                                        {t('Home.Hub.button')}
                                    </Button>,
                                ]}
                                align="left"
                                fadeUp
                                titleVariant="h4"
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

Features.propTypes = {
    /**
     * External classes
     */
    className: PropTypes.string,
};

export default Features;
