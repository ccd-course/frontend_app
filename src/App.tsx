import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { LandingPage } from "./pages/LandingPage";
import { PageNotFound } from "./pages/PageNotFound";
import { GamePage } from "./pages/GamePage";
import { AuthenticationDialog } from "./components/Dialogs/AuthenticationDialog";
import "./App.css";

export const App = () => {
  const [auth, setAuth] = useState<{ open: boolean; type: string }>({
    open: false,
    type: "",
  });

  return (
    <div className="App" style={{ display: "flex", flexDirection: "column" }}>
      <Header setAuth={setAuth}></Header>
      <AuthenticationDialog
        open={auth.open}
        setOpen={setAuth}
        type={auth.type}
      ></AuthenticationDialog>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Game/:id" element={<GamePage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default App;
