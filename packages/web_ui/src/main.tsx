import React from "react";
import ReactDOM from "react-dom/client";
import "normalize.css";
import "@src/base.css";
import { App } from "@src/containers/App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
);
