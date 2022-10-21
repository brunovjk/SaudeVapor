import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import { ContextProvider } from "./context/Context.js";
import "./i18n.js";

ReactDOM.render(
  <ContextProvider>
    <App />
  </ContextProvider>,
  document.getElementById("root")
);
