import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { colors } from "@material-ui/core";
import { Section } from "../../components/organisms";
import { Hero, HubValues, HubVision, Partners } from "./components";

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.alternate.main,

    height: "100%",
    width: "100%",
  },
  pagePaddingTop: {
    paddingTop: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(5),
    },
  },
  sectionNoPaddingTop: {
    paddingTop: 0,
  },
  shape: {
    background: theme.palette.common.white,
    borderBottomRightRadius: "50%",
    borderBottom: `1px solid ${colors.grey[200]}`,
  },
}));

const About = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.shape}>
        <Section className={classes.pagePaddingTop}>
          <Hero />
        </Section>
        <Section className={classes.sectionNoPaddingTop}>
          <HubVision />
        </Section>
        <Section className={classes.sectionNoPaddingTop}>
          <HubValues />
        </Section>
      </div>
      <Section>
        <Partners />
      </Section>
    </div>
  );
};

export default About;
