import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Grid, Typography, Box } from "@material-ui/core";
import { AdBanner } from "../../components/organisms";
import { StickyContainer, Sticky } from "react-sticky";

export default function Terms() {
  const { t } = useTranslation();
  return (
    <StickyContainer>
      <Container maxWidth="lg" style={{ paddingBlock: "32px" }}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="stretch"
        >
          {/* Terms */}
          <Grid item xs={12} md={8}>
            <Box component="div">
              <Typography variant="h3" pb="16px">
                {t("Terms.title")}
              </Typography>
              <Typography variant="body2" color="primary.text" component="div">
                <div
                  dangerouslySetInnerHTML={{
                    __html: t("Terms.text"),
                  }}
                />
              </Typography>
            </Box>
          </Grid>
          {/* AdBanner Sticky desktop*/}
          <Grid item xs={12} md={3}>
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
      </Container>
    </StickyContainer>
  );
}
