import React from "react";
import ReactDOM from "react-dom/client";
import "normalize.css";
import "@src/base.css";
import { App } from "@src/component/App";
import { NextUIProvider } from "@nextui-org/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <App />
    </NextUIProvider>
  </React.StrictMode>,
);
