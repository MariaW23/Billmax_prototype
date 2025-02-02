// PrimarySearchPage.js
import React, { useState } from 'react';
import { accounts } from './data';
import AccountCard from './AccountCard';

function PrimarySearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(accounts);

  const handleSearch = () => {
    const results = accounts.filter((account) =>
      account.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.accountNumber.includes(searchTerm) ||
      account.phoneNumber.includes(searchTerm) ||
      account.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.accountStatus.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Primary Search</h1>
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="p-2 border border-gray-300 rounded mr-2"
        />
        <button
          onClick={handleSearch}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>
      </div>
      {searchResults.map((account) => (
        <AccountCard key={account.accountNumber} account={account} />
      ))}
    </div>
  );
}

export default PrimarySearchPage;
