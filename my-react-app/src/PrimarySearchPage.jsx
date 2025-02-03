import React, { useState } from 'react';
import { accounts } from './data';
import { FaSortUp, FaSortDown, FaSearch } from 'react-icons/fa';
import './PrimarySearchPage.css';

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
    <div className="primary-search-container">
      <h1 className="title">Accounts</h1>
      <table className="search-table">
        <thead>
          <tr>
            {["accountNumber", "companyName", "contactName", "phoneNumber", "email", "accountStatus", "virtualCompany"].map(column => (
              <th key={column} className="sortable-header" onClick={() => requestSort(column)}>
                <span className="header-text">{column.replace(/([A-Z])/g, " $1").trim()}</span>
                {sortConfig.key === column ? (
                  sortConfig.direction === "ascending" ? <FaSortUp /> : <FaSortDown />
                ) : (
                  <FaSortUp className="sort-icon" />
                )}
                <div className="search-box-container">
                  <input 
                    type="text" 
                    onChange={handleSearch} 
                    placeholder="Search" 
                    className="search-box"
                  />
                  <FaSearch className="search-icon" />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredResults.map(account => (
            <tr key={account.accountNumber}>
              <td>{account.accountNumber}</td>
              <td>{account.companyName}</td>
              <td>{account.contactName}</td>
              <td>{account.phoneNumber}</td>
              <td>{account.email}</td>
              <td>{account.accountStatus}</td>
              <td>{account.virtualCompany}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PrimarySearchPage;
