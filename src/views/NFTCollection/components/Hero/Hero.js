import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Grid, Typography, Popover } from '@material-ui/core';
import { Image } from '../../../../components/atoms';
import { SectionHeader } from '../../../../components/molecules';

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
    donateInfo: {
        '&:hover': {
            color: theme.palette.primary.main,
        },
    },
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        background: theme.palette.alternate.main,
        maxWidth: '320px',
        padding: theme.spacing(1),
    },
}));

const Hero = (props) => {
    const { t } = useTranslation();

    const { className, ...rest } = props;
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const theme = useTheme();
    const isMd = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true,
    });

    return (
        <div className={clsx(classes.root, className)} {...rest}>
            <Grid container justify="space-between" spacing={8} direction={isMd ? 'row' : 'column-reverse'}>
                <Grid
                    item
                    container
                    alignItems="center"
                    xs={12}
                    md={6}
                    data-aos={'fade-up'}
                    className={classes.heroContent}
                >
                    <SectionHeader
                        title={
                            <span>
                                {t('Blockchain.Hero.title1')}
                                <br />
                                <Typography component="span" variant="h4" color="primary">
                                    {t('Blockchain.Hero.title2')}
                                </Typography>
                            </span>
                        }
                        subtitle={
                            <span>
                                {t('Blockchain.Hero.subtitle1')}
                                <span>
                                    <Typography
                                        aria-owns={open ? 'mouse-over-popover' : undefined}
                                        aria-haspopup="true"
                                        onMouseEnter={handlePopoverOpen}
                                        onMouseLeave={handlePopoverClose}
                                        className={classes.donateInfo}
                                        variant="inherit"
                                        color="inherit"
                                    >
                                        {t('Blockchain.Hero.subtitle2')}
                                    </Typography>
                                    <Popover
                                        id="mouse-over-popover"
                                        className={classes.popover}
                                        classes={{
                                            paper: classes.paper,
                                        }}
                                        open={open}
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                        transformOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                        onClose={handlePopoverClose}
                                        disableRestoreFocus
                                    >
                                        <Typography variant="caption">{t('Blockchain.Hero.popover1')}</Typography>
                                        <br />
                                        <Typography variant="caption">{t('Blockchain.Hero.popover2')}</Typography>
                                    </Popover>
                                </span>
                                .
                            </span>
                        }
                        align="left"
                        titleVariant="h6"
                        subtitleVariant="h6"
                    />
                </Grid>
                <Grid item container justify="flex-start" alignItems="center" xs={12} md={6} data-aos={'fade-up'}>
                    <Image
                        src="/images/illustrations/hero2.png"
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
