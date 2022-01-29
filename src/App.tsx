import React, { useEffect, useState } from "react";
import { Header } from "./components/Header";
import {
  AUTH_DIALOG_TYPES,
  AuthenticationDialog,
} from "./components/Dialogs/AuthenticationDialog";
import "./App.css";

export const App = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [authDialog, setAuthDialog] = useState<{
    open: boolean;
    type: AUTH_DIALOG_TYPES;
  }>({
    open: false,
    type: AUTH_DIALOG_TYPES.LOGIN,
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
      <Header
        email={email}
        setAuthDialog={setAuthDialog}
        setEmail={setEmail}
      ></Header>
      <AuthenticationDialog
        authDialog={authDialog}
        setAuthDialog={setAuthDialog}
        setEmail={setEmail}
      ></AuthenticationDialog>
      {/* <Routes>
                <Route
                    path="/"
                    element={<LandingPage auth={auth} setAuth={setAuth}/>}
                />
                <Route path="/Game/:id" element={<GamePage auth={auth}/>}/>
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>*/}
    </div>
  );
};

export default App;
