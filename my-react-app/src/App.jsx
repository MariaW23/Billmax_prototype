import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrimarySearchPage from "./PrimarySearchPage";

function App() {
  return (
    <Router>
        <Routes>
          {/* This structure allows to easily add routes to different pages if needed */}
          <Route path="/" element={<PrimarySearchPage />} />
        </Routes>
    </Router>
  );
}

export default App;