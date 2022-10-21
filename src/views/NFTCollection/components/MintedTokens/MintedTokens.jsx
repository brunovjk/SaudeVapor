import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Grid, LinearProgress, Box } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { SectionHeader } from '../../../../components/molecules';
import { CardBase, ImageToken } from '../../../../components/organisms';
import GetAllTokens from './GetAllTokens';

const useStyles = makeStyles((theme) => ({
    root: {},
}));

const MintedTokens = (props) => {
    const { data, className, ...rest } = props;
    const { t } = useTranslation();
    const classes = useStyles();

    const theme = useTheme();
    const isMd = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true,
    });

    const allTokens = GetAllTokens().slice(0, 9);

    return (
        <div className={clsx(classes.root, className)} {...rest}>
            <Grid container spacing={isMd ? 4 : 2}>
                <Grid item xs={12} data-aos="fade-up">
                    <SectionHeader
                        title={t('Blockchain.MintedTokens.title')}
                        align="center"
                        label={t('Blockchain.MintedTokens.label')}
                        disableGutter
                    />
                </Grid>
                {allTokens.length === 0 && (
                    <Grid item xs={12} data-aos="fade-up">
                        <SectionHeader
                            title={t('Blockchain.MintedTokens.loadingTitle')}
                            subtitle={t('Blockchain.MintedTokens.loadingSubtitle')}
                            align="center"
                            disableGutter
                        />
                        <Box sx={{ width: '100%' }}>
                            <LinearProgress />
                        </Box>
                    </Grid>
                )}
                <Grid item xs={12} data-aos="fade-up">
                    <Grid container spacing={2}>
                        {allTokens.length > 0 ? (
                            <>
                                {allTokens.map((item, index) => (
                                    <Grid item xs={4} key={index}>
                                        <CardBase withShadow liftUp align="left">
                                            <ImageToken tokenAddress={item} />
                                        </CardBase>
                                    </Grid>
                                ))}
                            </>
                        ) : (
                            <>
                                {Array.from(Array(9).keys()).map((item, index) => (
                                    <Grid item xs={4} key={index}>
                                        <CardBase withShadow liftUp align="left">
                                            <Skeleton variant="rect" width="100%" height="320px" />
                                        </CardBase>
                                    </Grid>
                                ))}
                            </>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

MintedTokens.propTypes = {
    /**
     * External classes
     */
    className: PropTypes.string,
    /**
     * data to be rendered
     */
    data: PropTypes.array.isRequired,
};

export default MintedTokens;
