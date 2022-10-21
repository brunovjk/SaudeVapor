import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { colors } from "@material-ui/core";
import { Section } from "../../components/organisms";
import { Customization, Hero, Hub, Articles } from "./components";

import { db } from "../../context/firebase-config";
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  startAt,
} from "firebase/firestore";
import { Context } from "../../context/Context";

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

const Home = () => {
  const { currentDate, collectionRef } = useContext(Context);
  const classes = useStyles();

  const [postCollection, setPostCollection] = useState([]);

  useEffect(() => {
    const getCollection = async () => {
      try {
        const qPostCollection = query(
          collection(db, collectionRef),
          orderBy("docName", "desc"),
          startAt(currentDate),
          limit(12)
        );

        const queryPostCollection = await getDocs(qPostCollection);

        setPostCollection(
          queryPostCollection.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      } catch (error) {
        console.log(error);
      }
    };

    getCollection();
  }, [currentDate, collectionRef]);

  return (
    <div className={classes.root}>
      <div className={classes.shape}>
        <Section className={classes.pagePaddingTop}>
          <Hero />
        </Section>
        <Section>
          <Customization />
        </Section>
        <Section className={classes.sectionNoPaddingTop}>
          <Hub />
        </Section>
      </div>
      <Section>
        <Articles data={postCollection} />
      </Section>
    </div>
  );
};

export default Home;
