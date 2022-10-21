import React from "react";
import { useTranslation } from "react-i18next";
import { Grid, Typography, Box, Divider, Link } from "@material-ui/core";
import { AdBanner } from "../../components/organisms";
import Skeleton from "@material-ui/lab/Skeleton";
import { StickyContainer, Sticky } from "react-sticky";

export default function DataPost({ postData }) {
  const { t } = useTranslation();

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
        spacing={{ xs: 2, md: 5 }}
        py={{ xs: "8px", sm: "16px", md: "64px" }}
      >
        {/* Title */}
        <Grid item>
          {postData.title ? (
            <Typography variant="h4">{postData.title}</Typography>
          ) : (
            <>
              <Skeleton animation="wave" height={56} width="100%" />
              <Skeleton animation="wave" height={56} width="100%" />
              <Skeleton animation="wave" height={56} width="55%" />
            </>
          )}

          {/* Date Author */}
          <Grid
            container
            item
            xs={12}
            direction={{ xs: "column", sm: "row" }}
            justifyContent="flex-start"
            alignItems="center"
            spacing={1}
          >
            <Grid item>
              {postData.date ? (
                <Typography variant="caption">{postData.date}</Typography>
              ) : (
                <>
                  <Skeleton animation="wave" height={14} width="45px" />
                </>
              )}
            </Grid>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Grid
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={1}
            >
              <Typography variant="caption">{t("Post.post.author")}</Typography>

              {postData.author && (
                <Typography variant="overline">
                  <Link
                    target="_blank"
                    rel="noopener"
                    underline="none"
                    href={postData.linkAuthor}
                  >
                    {postData.author}
                  </Link>
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>

        {/* Image */}
        <Grid item>
          <Box
            sx={{
              height: { xs: "80px", sm: "200px", md: "280px" },
              width: "100%",
              overflow: "hidden",
              borderRadius: "20px",
              backgroundImage: `url(${postData.urlImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></Box>
        </Grid>
        {/* Fab Social Media, text and AdBanner */}
        <Grid item>
          <StickyContainer>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              spacing={4}
            >
              {/* Text */}
              <Grid item xs={12} md={8}>
                {postData.text ? (
                  <>
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{ mt: "-16px" }}
                    >
                      <div
                        dangerouslySetInnerHTML={{
                          __html: postData.text,
                        }}
                      />
                    </Typography>
                    <Typography variant="overline" color="primary">
                      {t("Post.fullArticle.text")}
                      <Link
                        target="_blank"
                        rel="noopener"
                        underline="hover"
                        href={postData.linkArticle}
                      >
                        {t("Post.fullArticle.button")}
                      </Link>
                      .
                    </Typography>
                  </>
                ) : (
                  <>
                    <Skeleton animation="wave" height={20} width="100%" />
                    <Skeleton animation="wave" height={20} width="100%" />
                    <Skeleton animation="wave" height={20} width="100%" />
                    <Skeleton animation="wave" height={20} width="100%" />
                    <Skeleton animation="wave" height={20} width="100%" />
                    <Skeleton animation="wave" height={20} width="100%" />
                    <Skeleton animation="wave" height={20} width="100%" />
                    <Skeleton animation="wave" height={20} width="100%" />
                    <Skeleton animation="wave" height={20} width="100%" />
                    <Skeleton animation="wave" height={20} width="100%" />
                    <Skeleton animation="wave" height={20} width="100%" />
                    <Skeleton animation="wave" height={20} width="100%" />
                    <Skeleton animation="wave" height={20} width="100%" />
                    <Skeleton animation="wave" height={20} width="100%" />
                    <Skeleton animation="wave" height={20} width="100%" />
                    <Skeleton animation="wave" height={20} width="100%" />
                    <Skeleton animation="wave" height={20} width="55%" />
                  </>
                )}
              </Grid>
              {/* Ad Banner Desktop */}
              <Grid item xs={12} md={4}>
                <Sticky>
                  {({ style }) => (
                    <Box
                      style={style}
                      sx={{ display: { xs: "none", md: "block" } }}
                    >
                      <AdBanner />
                    </Box>
                  )}
                </Sticky>
                <Box sx={{ display: { xs: "block", md: "none" } }}>
                  <AdBanner />
                </Box>
              </Grid>
            </Grid>
          </StickyContainer>
        </Grid>
      </Grid>
    </>
  );
}
