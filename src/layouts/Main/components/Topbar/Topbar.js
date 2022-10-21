import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";

import {
  Toolbar,
  Hidden,
  List,
  ListItem,
  Typography,
  IconButton,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";

import { Image } from "../../../../components/atoms";

const useStyles = makeStyles((theme) => ({
  root: {},
  flexGrow: {
    flexGrow: 1,
  },
  navigationContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  toolbar: {
    maxWidth: theme.layout.contentWidth,
    width: "100%",
    margin: "0 auto",
    padding: theme.spacing(0, 2),
  },
  listItem: {
    cursor: "pointer",
    paddingTop: 0,
    paddingBottom: 0,
  },
  listItemText: {
    flex: "0 0 auto",
    whiteSpace: "nowrap",
    textDecoration: "none",
  },
  listItemButton: {
    whiteSpace: "nowrap",
  },
  iconButton: {
    padding: 0,
    color: theme.palette.primary.main,
    "&:hover": {
      background: "transparent",
    },
  },
  logoContainer: {
    width: 180,
    height: 54,
    [theme.breakpoints.up("md")]: {
      width: 180,
      height: 54,
    },
  },
  logoImage: {
    width: "100%",
    height: "100%",
  },
  icon: {
    fontSize: 24,
  },
}));

const Topbar = (props) => {
  const { t } = useTranslation();

  const { onSidebarOpen, ...rest } = props;

  const classes = useStyles();

  return (
    <Toolbar disableGutters className={classes.toolbar} {...rest}>
      <div className={classes.logoContainer}>
        <a href="/" title="SaudeVapor">
          <Image
            className={classes.logoImage}
            src="/images/logos/logo.svg"
            alt="SaudeVapor"
            lazy={false}
          />
        </a>
      </div>
      <div className={classes.flexGrow} />
      <Hidden smDown>
        <List className={classes.navigationContainer}>
          <ListItem className={classes.listItem}>
            <Typography
              variant="body1"
              color="textSecondary"
              className={classes.listItemText}
              component="a"
              href="/about"
            >
              {t("Footer.menu.about")}
            </Typography>
          </ListItem>
          <ListItem className={classes.listItem}>
            <IconButton component="a" href="/search">
              <SearchIcon className={classes.icon} />
            </IconButton>
          </ListItem>
          {/* <ListItem className={classes.listItem}>
            <Typography
              variant="body1"
              color="textSecondary"
              className={classes.listItemText}
              component="a"
              href="/not-found"
            >
              Error Page
            </Typography>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Button
              size="large"
              variant="contained"
              color="primary"
              component="a"
              target="blank"
              href="https://material-ui.com/store/items/the-front-landing-page/"
              className={classes.listItemButton}
            >
              Full Product
            </Button>
          </ListItem> */}
        </List>
      </Hidden>
      <Hidden mdUp>
        <IconButton
          className={classes.iconButton}
          onClick={onSidebarOpen}
          aria-label="Menu"
        >
          <MenuIcon />
        </IconButton>
      </Hidden>
    </Toolbar>
  );
};

Topbar.propTypes = {
  onSidebarOpen: PropTypes.func,
};

export default Topbar;
