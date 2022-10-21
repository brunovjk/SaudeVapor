/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, Typography, ListItemIcon } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {},
  listItem: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  listItemIcon: {
    minWidth: "auto",
  },
  listItemLink: {
    textDecoration: "none",
  },
  closeIcon: {
    justifyContent: "flex-end",
    cursor: "pointer",
  },
  divider: {
    width: "100%",
  },
}));

const SidebarNav = (props) => {
  const { t } = useTranslation();

  const { onClose, className, ...rest } = props;
  const classes = useStyles();

  return (
    <List {...rest} className={clsx(classes.root, className)}>
      <ListItem className={classes.closeIcon} onClick={onClose}>
        <ListItemIcon className={classes.listItemIcon}>
          <CloseIcon fontSize="small" />
        </ListItemIcon>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Typography
          variant="h6"
          color="primary"
          component="a"
          href="/about"
          className={classes.listItemLink}
        >
          {t("Footer.menu.about")}
        </Typography>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Typography
          variant="h6"
          color="primary"
          component="a"
          href="/contact"
          className={classes.listItemLink}
        >
          {t("Footer.menu.contact")}
        </Typography>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Typography
          variant="h6"
          color="primary"
          component="a"
          href="/searc"
          className={classes.listItemLink}
        >
          {t("Footer.menu.search")}
        </Typography>
      </ListItem>
      {/* <ListItem className={classes.listItem}>
        <Button
          size="large"
          variant="contained"
          color="primary"
          fullWidth
          component="a"
          target="blank"
          href="https://material-ui.com/store/items/the-front-landing-page/"
        >
          Upgrade Now
        </Button>
      </ListItem> */}
    </List>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
};

export default SidebarNav;
