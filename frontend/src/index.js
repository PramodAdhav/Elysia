import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";  // ✅ Ensure this line is present

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
