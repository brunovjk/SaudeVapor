import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { colors } from "@material-ui/core";
import { Section } from "../../components/organisms";
import { Searchbar, Articles } from "./components";

import { db } from "../../context/firebase-config";
import {
  collection,
  query,
  orderBy,
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
    borderBottomRightRadius: "100%",
    borderBottom: `1px solid ${colors.grey[200]}`,
  },
}));

const Search = () => {
  const { currentDate, collectionRef } = useContext(Context);
  const classes = useStyles();

  const [postCollection, setPostCollection] = useState([]);
  const [searchField, setSearchField] = useState("");

  useEffect(() => {
    const getCollection = async () => {
      try {
        const qPostCollection = query(
          collection(db, collectionRef),
          orderBy("docName", "desc"),
          startAt(currentDate)
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

  const dataFilteredbyCategory = postCollection.filter((item) =>
    item.title.includes(searchField)
  );

  const dataFiltered = dataFilteredbyCategory.filter((item) =>
    item.text.includes(searchField)
  );

  return (
    <div className={classes.root}>
      <div className={classes.shape}>
        <Section>
          <Searchbar setSearchField={setSearchField} />
        </Section>
      </div>
      <Section className={classes.sectionNoPaddingTop}>
        <Articles data={dataFiltered} postlenght={postCollection.length} />
      </Section>
    </div>
  );
};

export default Search;
