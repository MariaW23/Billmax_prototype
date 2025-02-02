// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PrimarySearchPage from './PrimarySearchPage';
import SecondarySearchPage from './SecondarySearchPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-4">
        <nav className="mb-4">
          <Link to="/" className="mr-4 text-blue-500">Primary Search</Link>
          <Link to="/advanced" className="text-blue-500">Advanced Search</Link>
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
