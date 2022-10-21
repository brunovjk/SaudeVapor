import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useMediaQuery, Grid, Box, Link } from "@material-ui/core";
import { SectionHeader } from "../../../../components/molecules";

const useStyles = makeStyles((theme) => ({
  root: {},
  space: {
    marginBlock: "16px",
  },
}));

const Partners = (props) => {
  const { data, className, ...rest } = props;
  const { t } = useTranslation();
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Grid container spacing={isMd ? 9 : 6}>
        <Grid item xs={12} data-aos="fade-up">
          <SectionHeader
            title={t("Partners.text")}
            subtitle={t("Partners.title")}
            align="center"
            // label={t("Home.Articles.label")}

            disableGutter
          />
        </Grid>
        <Grid
          container
          item
          dislplay="flex"
          justifyContent="center"
          alignItems="center"
          spacing={6}
        >
          <Grid item>
            <Link
              target="_blank"
              rel="noopener"
              underline="none"
              href="https://www.biomedcentral.com/about/open-access"
            >
              <Box
                component="img"
                src="https://firebasestorage.googleapis.com/v0/b/saude-vapor-1-0.appspot.com/o/images%2FBlog%2FstaticImages%2Fbmc.png?alt=media&token=0b9dafbb-b84e-41f1-8eda-d3b7bfa46afb"
                sx={{ height: "45px" }}
              />
            </Link>
          </Grid>
          <Grid item>
            <Link
              target="_blank"
              rel="noopener"
              underline="none"
              href="https://developers.google.com/learn/topics/firebase"
            >
              <Box
                component="img"
                src="https://firebasestorage.googleapis.com/v0/b/saude-vapor-1-0.appspot.com/o/images%2FBlog%2FstaticImages%2Ffirebase.png?alt=media&token=75bf4c0b-88e1-42de-8edf-8e7765bf011f"
                sx={{ height: "45px" }}
              />
            </Link>
          </Grid>
          <Grid item>
            <Link
              target="_blank"
              rel="noopener"
              underline="none"
              href="https://www.pexels.com/license/"
            >
              <Box
                component="img"
                src="https://firebasestorage.googleapis.com/v0/b/saude-vapor-1-0.appspot.com/o/images%2FBlog%2FstaticImages%2Fpexels.png?alt=media&token=f1824dee-2c35-43aa-9e34-441da3393a77"
                sx={{ height: "45px" }}
              />
            </Link>
          </Grid>
          <Grid item>
            <Link
              target="_blank"
              rel="noopener"
              underline="none"
              href="https://unsplash.com/license"
            >
              <Box
                component="img"
                src="https://firebasestorage.googleapis.com/v0/b/saude-vapor-1-0.appspot.com/o/images%2FBlog%2FstaticImages%2Funsplash.png?alt=media&token=bc2997b9-afbb-400c-a158-306e2782957e"
                sx={{ height: "45px" }}
              />
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

Partners.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
  /**
   * data to be rendered
   */
  data: PropTypes.array.isRequired,
};

export default Partners;
