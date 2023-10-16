import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

import { Navbar } from "./components/Navbar/Navbar";
import { AuthMiddleware } from "./components/middlewares/AuthMiddleware";
import { AuthContextProvider } from "./context/AuthContext";
import "./index.css";
import { LoginPage, RegisterPage } from "./screens";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <Navbar />
        <Toaster expand closeButton richColors />
        <Routes>
          <Route
            path="/login"
            element={
              <AuthMiddleware mustBeLoggedIn={false}>
                <LoginPage />
              </AuthMiddleware>
            }
          />
          <Route
            path="/register"
            element={
              <AuthMiddleware mustBeLoggedIn={false}>
                <RegisterPage />
              </AuthMiddleware>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>
);
