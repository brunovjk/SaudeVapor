import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
// import { useMediaQuery } from "@material-ui/core";
import { SectionHeader } from '../../../../components/molecules';

const useStyles = makeStyles((theme) => ({
    root: {},
}));

const Customization = (props) => {
    const { t } = useTranslation();
    const { className, ...rest } = props;
    const classes = useStyles();

    return (
        <div className={clsx(classes.root, className)} {...rest}>
            <SectionHeader
                title={t('Home.saudevaporDream.title')}
                subtitle={t('Home.saudevaporDream.subtitle')}
                align="center"
                fadeUp
                subtitleVariant="h4"
                // ctaGroup={[
                //   <Button variant="contained" color="primary" size="large">
                //     Start now
                //   </Button>,
                //   <Button variant="outlined" color="primary" size="large">
                //     Learn more
                //   </Button>,
                // ]}
            />
        </div>
    );
};

Customization.propTypes = {
    /**
     * External classes
     */
    className: PropTypes.string,
};

export default Customization;
