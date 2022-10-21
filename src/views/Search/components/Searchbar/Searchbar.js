import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, TextField } from "@material-ui/core";
import { SectionHeader } from "../../../../components/molecules";

const useStyles = makeStyles((theme) => ({
  root: {},
  searchbar: {
    width: "50vw",
    [theme.breakpoints.down("sm")]: {
      width: "80vw",
    },
  },
}));

const Searchbar = (props) => {
  const { t } = useTranslation();
  const { setSearchField, className, ...rest } = props;
  const classes = useStyles();

  const handleSearchChange = (event) => {
    setSearchField(event.target.value);
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <SectionHeader
        align="center"
        disableGutter
        fadeUp
        ctaGroup={[
          <Paper className={classes.searchbar}>
            <TextField
              fullWidth={true}
              id="busca"
              label={t("Search.textField.input")}
              variant="outlined"
              onChange={handleSearchChange}
            />
          </Paper>,
        ]}
      />
    </div>
  );
};

Searchbar.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default Searchbar;
