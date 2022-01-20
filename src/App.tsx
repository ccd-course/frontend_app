import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { LandingPage } from "./pages/LandingPage";
import { PageNotFound } from "./pages/PageNotFound";
import { GamePage } from "./pages/GamePage";
import { AuthenticationDialog } from "./components/Dialogs/AuthenticationDialog";
import { firebaseConfigApp } from "./configs/firebase.config";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  query,
  doc,
  onSnapshot,
} from "firebase/firestore";

import "./App.css";
import { AuthenticationState } from "./types";

export const App = () => {
  const [auth, setAuth] = useState<AuthenticationState>({
    open: false,
    type: "",
    email: null,
  });

  const db = getFirestore(firebaseConfigApp);

  onSnapshot(
    doc(db, "users", "adawieh"),
    { includeMetadataChanges: true },
    (doc) => {
      console.log(doc.data({}));
    }
  );

  return (
    <div className="App" style={{ display: "flex", flexDirection: "column" }}>
      <Header setAuth={setAuth} auth={auth}></Header>
      <AuthenticationDialog
        open={auth.open}
        setOpen={setAuth}
        type={auth.type}
      ></AuthenticationDialog>
      <Routes>
        <Route
          path="/"
          element={<LandingPage auth={auth} setAuth={setAuth} />}
        />
        <Route path="/Game/:id" element={<GamePage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default App;
