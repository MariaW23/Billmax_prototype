import React, { useState } from 'react';
import { accounts } from './data';
import { FaSortUp, FaSortDown } from 'react-icons/fa';

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
      <table className="w-full border-collapse border border-gray-300 rounded shadow">
        <thead className="bg-gray-100 text-left">
          <tr>
            {["accountNumber", "companyName", "contactName", "phoneNumber", "email", "accountStatus", "virtualCompany"].map(column => (
              <th key={column} className="p-2 border border-gray-300 cursor-pointer text-gray-700">
                <div className="flex items-center space-x-1" onClick={() => requestSort(column)}>
                  <span className="font-semibold">{column.replace(/([A-Z])/g, " $1").trim()}</span>
                  {sortConfig.key === column ? (
                    sortConfig.direction === "ascending" ? <FaSortUp /> : <FaSortDown />
                  ) : (
                    <FaSortUp className="text-gray-400" />
                  )}
                </div>
                <input 
                  type="text" 
                  onChange={handleSearch} 
                  placeholder="Search" 
                  className="w-full p-1 border border-gray-300 rounded bg-gray-50 text-gray-600 mt-1"
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredResults.map(account => (
            <tr key={account.accountNumber} className="border border-gray-300">
              <td className="p-2 border border-gray-300">{account.accountNumber}</td>
              <td className="p-2 border border-gray-300">{account.companyName}</td>
              <td className="p-2 border border-gray-300">{account.contactName}</td>
              <td className="p-2 border border-gray-300">{account.phoneNumber}</td>
              <td className="p-2 border border-gray-300">{account.email}</td>
              <td className="p-2 border border-gray-300">{account.accountStatus}</td>
              <td className="p-2 border border-gray-300">{account.virtualCompany}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PrimarySearchPage;