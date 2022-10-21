import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useMediaQuery, Grid, Typography } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { LearnMoreLink, Image } from "../../../../components/atoms";
import { SectionHeader } from "../../../../components/molecules";
import { CardArticle } from "../../../../components/organisms";

const useStyles = makeStyles((theme) => ({
  root: {},
  space: {
    marginBlock: "16px",
  },
  linkTo: {
    textDecoration: "none",
  },
}));

const Articles = (props) => {
  const { data, className, ...rest } = props;
  const { t } = useTranslation();
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Grid container spacing={isMd ? 4 : 2}>
        <Grid item xs={12} data-aos="fade-up">
          <SectionHeader
            title={t("Home.Articles.title")}
            // subtitle="Our mission is to help you to grow your design skills, meet and connect with professional dsigners who share your passions."
            align="center"
            label={t("Home.Articles.label")}
            // ctaGroup={[
            //   <LearnMoreLink
            //     title="See all integrations"
            //     href="#"
            //     variant="h6"
            //   />,
            // ]}
            disableGutter
          />
        </Grid>
        <Grid item xs={12} data-aos="fade-up">
          <Grid container spacing={2}>
            {data.length > 0 ? (
              <>
                {data.map((item, index) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
                    key={index}
                    component="a"
                    href={`/post/${item.docName}`}
                    className={classes.linkTo}
                  >
                    <CardArticle withShadow liftUp align="left">
                      <Image src={item.urlImage} alt={item.title} lazy={true} />
                      <Typography variant="overline" color="primary">
                        {item.date}
                      </Typography>
                      <Typography variant="subtitle">{item.title}</Typography>
                    </CardArticle>
                  </Grid>
                ))}
              </>
            ) : (
              <>
                {Array.from(Array(12).keys()).map((item, index) => (
                  <Grid item xs={3} key={index}>
                    <CardArticle withShadow liftUp align="left">
                      <Skeleton variant="rect" width={210} height={118} />
                      <Skeleton width="40%" className={classes.space} />
                      <Skeleton width="100%" />
                      <Skeleton width="100%" />
                      <Skeleton width="100%" />
                    </CardArticle>
                  </Grid>
                ))}
              </>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} data-aos="fade-up">
          <SectionHeader
            title={t("Home.infinityLoading.text")}
            // subtitle="Our mission is to help you to grow your design skills, meet and connect with professional dsigners who share your passions."
            align="center"
            // label="SaudeVapor Blog"
            ctaGroup={[
              <LearnMoreLink
                title={t("Home.infinityLoading.button")}
                href="/search"
                variant="h6"
              />,
            ]}
            titleVariant="h5"
            disableGutter
          />
        </Grid>
      </Grid>
    </div>
  );
};

Articles.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
  /**
   * data to be rendered
   */
  data: PropTypes.array.isRequired,
};

export default Articles;
