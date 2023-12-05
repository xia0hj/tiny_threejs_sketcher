import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "@/feature/react_ui/component/App";
import "normalize.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
