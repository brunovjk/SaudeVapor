import React, { useState, useEffect, useContext } from "react";
import DataPost from "./DataPost";

import { Container } from "@material-ui/core";

import { db } from "../../context/firebase-config";
import { doc, getDoc } from "firebase/firestore";

import { Context } from "../../context/Context";

import { useHistory } from "react-router-dom";

export default function Post() {
  const { collectionRef } = useContext(Context);

  let navigate = useHistory();
  let blogId = decodeURI(window.location.pathname.split("/").pop());

  const [postData, setPostData] = useState([]);

  useEffect(() => {
    const getPost = async () => {
      try {
        if (blogId) {
          const docRef = doc(db, collectionRef, blogId);

          const dataDocRef = await getDoc(docRef);

          setPostData(dataDocRef.data());

          if (dataDocRef.data() !== undefined) {
          } else {
            navigate("/not-found");
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    getPost();
  }, [blogId, navigate, collectionRef]);

  return (
    <Container maxWidth="md" style={{ paddingBlock: "32px" }}>
      {/* {dataExist ? (
        <> */}
      <DataPost postData={postData} />
      {/* </>
      ) : (
        <SkeletonPost />
      )} */}
    </Container>
  );
}
