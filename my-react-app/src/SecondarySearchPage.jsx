import React, { useState } from 'react';
import { accounts } from './data';
import AccountCard from './AccountCard';

function SecondarySearchPage() {
  const [filters, setFilters] = useState({ status: '', date: '', keyword: '' });
  const [filteredResults, setFilteredResults] = useState(accounts);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    let results = accounts;
    if (filters.status) {
      results = results.filter(account => account.accountStatus.toLowerCase() === filters.status.toLowerCase());
    }
    if (filters.date) {
      results = results.filter(account => account.creationDate === filters.date);
    }
    if (filters.keyword) {
      results = results.filter(account => 
        account.companyName.toLowerCase().includes(filters.keyword.toLowerCase()) ||
        account.contactName.toLowerCase().includes(filters.keyword.toLowerCase())
      );
    }
    setFilteredResults(results);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Advanced Search</h1>
      <div className="mb-4">
        <select name="status" onChange={handleFilterChange} className="p-2 border border-gray-300 rounded mr-2">
          <option value="">Select Status</option>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
          <option value="collections">Collections</option>
          <option value="suspended">Suspended</option>
        </select>
        <input type="date" name="date" onChange={handleFilterChange} className="p-2 border border-gray-300 rounded mr-2" />
        <input type="text" name="keyword" placeholder="Keyword..." onChange={handleFilterChange} className="p-2 border border-gray-300 rounded mr-2" />
        <button onClick={applyFilters} className="p-2 bg-blue-500 text-white rounded">Apply Filters</button>
      </div>
      {filteredResults.map(account => (
        <AccountCard key={account.accountNumber} account={account} />
      ))}
    </div>
  );
}

export default SecondarySearchPage;
