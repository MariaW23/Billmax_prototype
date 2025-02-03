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
        <nav className="mb-4 flex justify-between items-center bg-white p-4 shadow rounded">
          <div className="flex space-x-4">
            <Link to="/" className="text-blue-500 font-semibold">Primary Search</Link>
            <Link to="/advanced" className="text-blue-500 font-semibold">Advanced Search</Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<PrimarySearchPage />} />
          <Route path="/advanced" element={<SecondarySearchPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;