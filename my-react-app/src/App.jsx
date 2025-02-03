import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import PrimarySearchPage from "./PrimarySearchPage";
import SecondarySearchPage from "./SecondarySearchPage";
import { accounts } from "./data";
import AccountCard from "./AccountCard";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-4">
        <Routes>
          <Route path="/" element={<PrimarySearchPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;