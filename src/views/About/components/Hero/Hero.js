import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useMediaQuery, Grid, Typography, IconButton } from "@material-ui/core";
import { Image } from "../../../../components/atoms";
import { SectionHeader } from "../../../../components/molecules";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";

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

const Hero = (props) => {
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
                {t("About.Hero.title1")}
                <br />
                <Typography component="span" variant="inherit" color="primary">
                  {t("About.Hero.title2")}
                </Typography>
              </span>
            }
            subtitle={t("About.Hero.subtitle")}
            label={t("About.Hero.label")}
            ctaGroup={[
              <IconButton
                className={classes.socialIcon}
                target="_blank"
                rel="noopener"
                underline="none"
                href={t("SocialMediaLinks.facebook")}
              >
                <FacebookIcon className={classes.icon} />
              </IconButton>,
              <IconButton
                className={classes.socialIcon}
                target="_blank"
                rel="noopener"
                underline="none"
                href={t("SocialMediaLinks.instagram")}
              >
                <InstagramIcon className={classes.icon} />
              </IconButton>,
              <IconButton
                className={classes.socialIcon}
                target="_blank"
                rel="noopener"
                underline="none"
                href={t("SocialMediaLinks.twitter")}
              >
                <TwitterIcon className={classes.icon} />
              </IconButton>,
            ]}
            align="left"
            titleVariant="h3"
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
            src="https://firebasestorage.googleapis.com/v0/b/saude-vapor-1-0.appspot.com/o/images%2FBlog%2FstaticImages%2Fhero1.png?alt=media&token=f6423ff2-4543-4c46-af57-0de13c14c88a"
            alt="Our Mission"
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
