import React from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { LandingPage } from "./pages/LandingPage";
import { PageNotFound } from "./pages/PageNotFound";

export const App = () => {
  return (
    <div className="App" style={{ display: "flex", flexDirection: "column" }}>
      <Header></Header>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default App;
