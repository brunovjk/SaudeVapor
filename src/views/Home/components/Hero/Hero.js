import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Grid, Typography, IconButton } from '@material-ui/core';
import { Image } from '../../../../components/atoms';
import { SectionHeader } from '../../../../components/molecules';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';

const useStyles = makeStyles((theme) => ({
    root: {},
    image: {
        [theme.breakpoints.down('sm')]: {
            maxWidth: 500,
        },
    },
    heroContent: {
        [theme.breakpoints.up('md')]: {
            marginTop: theme.spacing(4),
        },
    },
    socialIcon: {
        color: theme.palette.primary.main,
        '&:hover': {
            background: 'transparent',
        },
        '&:last-child': {
            marginRight: 0,
        },
    },
    icon: {
        fontSize: 24,
    },
}));

const Hero = (props) => {
    const { t } = useTranslation();

    const { className, ...rest } = props;
    const classes = useStyles();

    const theme = useTheme();
    const isMd = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true,
    });

    return (
        <div className={clsx(classes.root, className)} {...rest}>
            <Grid container justify="space-between" spacing={4} direction={isMd ? 'row' : 'column-reverse'}>
                <Grid
                    item
                    container
                    alignItems="flex-end"
                    xs={12}
                    md={6}
                    data-aos={'fade-up'}
                    className={classes.heroContent}
                >
                    <SectionHeader
                        title={
                            <span>
                                {t('Home.Hero.title1')}
                                <br />
                                <Typography component="span" variant="h4" color="primary">
                                    {t('Home.Hero.title2')}
                                </Typography>
                            </span>
                        }
                        subtitle={t('Home.Hero.subtitle')}
                        ctaGroup={[
                            <IconButton
                                className={classes.socialIcon}
                                target="_blank"
                                rel="noopener"
                                underline="none"
                                href={t('SocialMediaLinks.facebook')}
                            >
                                <FacebookIcon className={classes.icon} />
                            </IconButton>,
                            <IconButton
                                className={classes.socialIcon}
                                target="_blank"
                                rel="noopener"
                                underline="none"
                                href={t('SocialMediaLinks.instagram')}
                            >
                                <InstagramIcon className={classes.icon} />
                            </IconButton>,
                            <IconButton
                                className={classes.socialIcon}
                                target="_blank"
                                rel="noopener"
                                underline="none"
                                href={t('SocialMediaLinks.twitter')}
                            >
                                <TwitterIcon className={classes.icon} />
                            </IconButton>,
                        ]}
                        align="left"
                        titleVariant="h5"
                    />
                </Grid>
                <Grid item container justify="flex-start" alignItems="center" xs={12} md={6} data-aos={'fade-up'}>
                    <Image
                        src="/images/illustrations/hero1.png"
                        alt="TheFront Company"
                        className={classes.image}
                        data-aos="flip-left"
                        data-aos-easing="ease-out-cubic"
                        data-aos-duration="2000"
                    />
                </Grid>
            </Grid>
        </div>
    );
};

Hero.propTypes = {
    /**
     * External classes
     */
    className: PropTypes.string,
};

export default Hero;
