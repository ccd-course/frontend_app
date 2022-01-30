import React, { useEffect, useState } from "react";
import { Header } from "./components/Header";
import {
  AUTH_DIALOG_TYPES,
  AuthenticationDialog,
} from "./components/Dialogs/AuthenticationDialog";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { IAuthDialog } from "./types";
import { PageNotFound } from "./pages/PageNotFound";
import { GamePage } from "./pages/GamePage";

export const App = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [authDialog, setAuthDialog] = useState<IAuthDialog>({
    open: false,
    type: AUTH_DIALOG_TYPES.UNDEFINED,
  });

  useEffect(() => {
    const jwt_token = localStorage.getItem("jwt_token");
    const email = localStorage.getItem("email");
    if (jwt_token && email) {
      setEmail(email);
    }
  }, []);

  return (
    <div className="App" style={{ display: "flex", flexDirection: "column" }}>
      <Header email={email} setAuthDialog={setAuthDialog} setEmail={setEmail} />
      <AuthenticationDialog
        authDialog={authDialog}
        setAuthDialog={setAuthDialog}
        setEmail={setEmail}
      />
      <Routes>
        <Route
          path="/"
          element={<LandingPage email={email} setAuthDialog={setAuthDialog} />}
        />

        <Route path="/Game/:id" element={<GamePage email={email} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default App;
