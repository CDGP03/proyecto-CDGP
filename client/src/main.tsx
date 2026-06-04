
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
 
// Forzar dark mode siempre — el portfolio es siempre oscuro
document.documentElement.classList.add("dark");
 
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
 