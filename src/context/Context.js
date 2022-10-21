import React, { useState, useEffect } from "react";

export const Context = React.createContext();

export const ContextProvider = ({ children }) => {
  // const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const [collectionRef, setCollectionRef] = useState("posts-en");

  const selectedLanguageFull = localStorage.getItem("i18nextLng") || "en";
  const selectedLanguage = selectedLanguageFull.slice(0, 2);

  let monthsNumber = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
  ];
  const currentDate = `${new Date().getFullYear()}-${
    monthsNumber[new Date().getMonth()]
  }-${monthsNumber[new Date().getDate()]}`;

  useEffect(() => {
    try {
      if (selectedLanguage === "pt") {
        setCollectionRef(`posts-${selectedLanguage}`);
      }
    } catch (error) {
      console.log(error);
    }
  }, [selectedLanguage]);

  return (
    <Context.Provider
      value={{
        currentDate,
        selectedLanguage,
        collectionRef,
        // isAuth,
        // setIsAuth,
      }}
    >
      {children}
    </Context.Provider>
  );
};
