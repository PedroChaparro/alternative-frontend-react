import {
  AuthContextProvider,
  FilesDialogsProvider,
  FoldersNavigationProviders,
  UserFilesProvider
} from "@/context/index";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

import { Navbar } from "./components/Navbar/Navbar";
import { AuthMiddleware } from "./components/middlewares/AuthMiddleware";
import "./index.css";
import {
  FilesView,
  Landing,
  LoginPage,
  ProfilePage,
  RegisterPage
} from "./screens";
import { FilesPageLayout } from "./screens/files/FilesLayout";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <Navbar />
        <Toaster expand closeButton richColors />
        <Routes>
          <Route path="/" element={<Landing />} />
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
          <Route
            path="/files"
            element={
              <AuthMiddleware mustBeLoggedIn>
                <FoldersNavigationProviders>
                  <FilesDialogsProvider>
                    <UserFilesProvider>
                      <FilesPageLayout />
                    </UserFilesProvider>
                  </FilesDialogsProvider>
                </FoldersNavigationProviders>
              </AuthMiddleware>
            }
          >
            <Route
              path=""
              element={
                <AuthMiddleware mustBeLoggedIn={true}>
                  <FilesView />
                </AuthMiddleware>
              }
            />
          </Route>
          <Route
            path="/profile"
            element={
              <AuthMiddleware mustBeLoggedIn={true}>
                <ProfilePage />
              </AuthMiddleware>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>
);
