import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  IconButton,
  List,
  ListItem,
  Divider,
  Typography,
} from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import { useTranslation } from "react-i18next";
import { Image } from "../../../../components/atoms";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 0),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6, 0),
    },
    background: theme.palette.background.footer,
  },
  footerContainer: {
    maxWidth: theme.layout.contentWidth,
    width: "100%",
    margin: "0 auto",
    padding: theme.spacing(0, 2),
  },
  logoContainerItem: {
    paddingTop: 0,
  },
  logoContainer: {
    width: 180,
    height: 54,
  },
  logoImage: {
    width: "100%",
    height: "100%",
  },
  socialIcon: {
    padding: 0,
    marginRight: theme.spacing(3),
    color: theme.palette.common.white,
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
  linkTo: {
    color: theme.palette.common.white,
    textDecoration: "none",
  },
  terms: {
    color: theme.palette.common.white,
    textDecoration: "none",
  },
}));

const Footer = (props) => {
  const { t } = useTranslation();

  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.footerContainer}>
        <List disablePadding>
          <ListItem disableGutters>
            <Grid
              container
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems="center"
              sx={{
                px: { sm: "1rem" },
              }}
            >
              <Grid item className={classes.logoContainerItem}>
                <div className={classes.logoContainer}>
                  <a href="/" title="SaudeVapor">
                    <Image
                      className={classes.logoImage}
                      src="/images/logos/logo-negative.svg"
                      alt="SaudeVapor"
                      lazy={false}
                    />
                  </a>
                </div>
              </Grid>
              <Grid item>
                <IconButton
                  className={classes.socialIcon}
                  target="_blank"
                  rel="noopener"
                  underline="none"
                  href={t("SocialMediaLinks.facebook")}
                >
                  <FacebookIcon className={classes.icon} />
                </IconButton>
                <IconButton
                  className={classes.socialIcon}
                  target="_blank"
                  rel="noopener"
                  underline="none"
                  href={t("SocialMediaLinks.instagram")}
                >
                  <InstagramIcon className={classes.icon} />
                </IconButton>
                <IconButton
                  className={classes.socialIcon}
                  target="_blank"
                  rel="noopener"
                  underline="none"
                  href={t("SocialMediaLinks.twitter")}
                >
                  <TwitterIcon className={classes.icon} />
                </IconButton>
              </Grid>
            </Grid>
          </ListItem>

          <ListItem disableGutters>
            <Grid
              container
              spacing={5}
              sx={{
                pl: { sm: "1rem" },
                pb: "1rem",
              }}
              direction={{ xs: "column", sm: "row" }}
              justifyContent="flex-start"
              alignItems="center"
            >
              <Grid item>
                <Typography
                  variant="h6"
                  className={classes.linkTo}
                  title="About"
                  href="/about"
                  component="a"
                >
                  {t("Footer.menu.about")}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="h6"
                  className={classes.linkTo}
                  title="Contact"
                  href="/contact"
                  component="a"
                >
                  {t("Footer.menu.contact")}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="h6"
                  className={classes.linkTo}
                  title="Search"
                  href="/search"
                  component="a"
                >
                  {t("Footer.menu.search")}
                </Typography>
              </Grid>
            </Grid>
          </ListItem>

          <Divider style={{ background: "white", marginBlock: "16px" }} />

          <ListItem disableGutters>
            <Grid
              container
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems="center"
              sx={{
                px: { sm: "1rem" },
              }}
            >
              <Grid item>
                <Typography
                  className={classes.terms}
                  component="a"
                  href="/terms"
                >
                  {t("Footer.terms")}
                </Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.terms}>
                  {t("Footer.copyright")}
                </Typography>
              </Grid>
            </Grid>
          </ListItem>
        </List>
      </div>
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
};

export default Footer;
