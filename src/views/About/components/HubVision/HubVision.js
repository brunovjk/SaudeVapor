import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useMediaQuery, Grid, Typography } from "@material-ui/core";
import { Image } from "../../../../components/atoms";
import { SectionHeader } from "../../../../components/molecules";

const useStyles = makeStyles((theme) => ({
  root: {},
  image: {
    boxShadow:
      "25px 60px 125px -25px rgba(80,102,144,.1), 16px 40px 75px -40px rgba(0,0,0,.2)",
    borderRadius: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      maxWidth: 500,
    },
  },
  heroContent: {
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(4),
    },
  },
  socialIcon: {
    color: theme.palette.primary.main,
    "&:hover": {
      background: "transparent",
    },
    "&:last-child": {
      marginRight: 0,
    },
  },
  icon: {
    fontSize: 24,
  },
}));

const HubVision = (props) => {
  const { t } = useTranslation();

  const { className, ...rest } = props;
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Grid
        container
        justify="space-between"
        spacing={4}
        direction={isMd ? "row" : "column-reverse"}
      >
        <Grid
          item
          container
          justify="flex-start"
          alignItems="center"
          xs={12}
          md={6}
          data-aos={"fade-up"}
        >
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/saude-vapor-1-0.appspot.com/o/images%2FBlog%2FstaticImages%2Fhero2.png?alt=media&token=c1d257fc-eef3-465c-a0c7-8fc517a7cd3b"
            alt="Our vision"
            className={classes.image}
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          />
        </Grid>
        <Grid
          item
          container
          alignItems="center"
          xs={12}
          md={6}
          data-aos={"fade-up"}
          className={classes.heroContent}
        >
          <SectionHeader
            title={
              <span>
                {t("About.HubVision.title1")}
                <br />
                <Typography component="span" variant="inherit" color="primary">
                  {t("About.HubVision.title2")}
                </Typography>
              </span>
            }
            subtitle={t("About.HubVision.subtitle")}
            label={t("About.HubVision.label")}
            align="left"
            titleVariant="h4"
          />
        </Grid>
      </Grid>
    </div>
  );
};

HubVision.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default HubVision;
