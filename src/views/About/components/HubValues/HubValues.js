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

const HubValues = (props) => {
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
          alignItems="center"
          xs={12}
          md={6}
          data-aos={"fade-up"}
          className={classes.heroContent}
        >
          <SectionHeader
            title={
              <span>
                {t("About.HubValues.title1")}
                <br />
                <Typography component="span" variant="inherit" color="primary">
                  {t("About.HubValues.title2")}
                </Typography>
              </span>
            }
            subtitle={t("About.HubValues.subtitle")}
            label={t("About.HubValues.label")}
            align="left"
            titleVariant="h4"
          />
        </Grid>
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
            src="https://firebasestorage.googleapis.com/v0/b/saude-vapor-1-0.appspot.com/o/images%2FBlog%2FpostImages%2Fpexels-polina-zimmerman-3782228.jpg?alt=media&token=adaf6261-4830-45d1-97da-a8e591713246"
            alt="Our values"
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

HubValues.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default HubValues;
