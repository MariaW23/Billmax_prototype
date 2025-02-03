import React, { useState } from 'react';
import { accounts } from './data';

function PrimarySearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState(accounts);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const results = accounts.filter((account) =>
      Object.values(account).some(value =>
        value.toString().toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
    setFilteredResults(results);
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    sortData(key, direction);
  };

  const sortData = (key, direction) => {
    const sortedData = [...filteredResults].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    setFilteredResults(sortedData);
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Accounts</h1>
      <table className="w-full border-collapse border rounded shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border cursor-pointer" onClick={() => requestSort('accountNumber')}>Account Number ⬆⬇ <input type="text" onChange={handleSearch} className="w-full p-1 border rounded"/></th>
            <th className="p-2 border cursor-pointer" onClick={() => requestSort('companyName')}>Company ⬆⬇ <input type="text" onChange={handleSearch} className="w-full p-1 border rounded"/></th>
            <th className="p-2 border cursor-pointer" onClick={() => requestSort('contactName')}>Contact ⬆⬇ <input type="text" onChange={handleSearch} className="w-full p-1 border rounded"/></th>
            <th className="p-2 border cursor-pointer" onClick={() => requestSort('phoneNumber')}>Phone Number ⬆⬇ <input type="text" onChange={handleSearch} className="w-full p-1 border rounded"/></th>
            <th className="p-2 border cursor-pointer" onClick={() => requestSort('email')}>Email ⬆⬇ <input type="text" onChange={handleSearch} className="w-full p-1 border rounded"/></th>
            <th className="p-2 border cursor-pointer" onClick={() => requestSort('accountStatus')}>Status ⬆⬇</th>
            <th className="p-2 border cursor-pointer" onClick={() => requestSort('virtualCompany')}>Virtual Company ⬆⬇</th>
          </tr>
        </thead>
        <tbody>
          {filteredResults.map(account => (
            <tr key={account.accountNumber} className="border">
              <td className="p-2 border">{account.accountNumber}</td>
              <td className="p-2 border">{account.companyName}</td>
              <td className="p-2 border">{account.contactName}</td>
              <td className="p-2 border">{account.phoneNumber}</td>
              <td className="p-2 border">{account.email}</td>
              <td className="p-2 border">{account.accountStatus}</td>
              <td className="p-2 border">{account.virtualCompany}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PrimarySearchPage;