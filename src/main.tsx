import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes } from "react-router-dom";
import { Toaster } from "sonner";

import { Navbar } from "./components/Navbar/Navbar";
import { AuthContextProvider } from "./context/AuthContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <Navbar />
        <Toaster expand closeButton richColors />
        <Routes></Routes>
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>
);
