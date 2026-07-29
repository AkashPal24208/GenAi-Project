import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./app.routes";
import "./style.scss";
import { AuthProvider } from "./features/auth/auth.context";
import App from "./App"
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App/>
  </StrictMode>
);
