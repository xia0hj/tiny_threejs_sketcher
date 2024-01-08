import React from "react";
import ReactDOM from "react-dom/client";
import { add } from "sdk";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <div>{add(1,2)}</div>
    </React.StrictMode>,
);
