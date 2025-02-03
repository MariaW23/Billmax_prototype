import React, { useState } from 'react';
import { accounts } from './data';
import { FaSortUp, FaSortDown, FaSearch, FaFilter } from 'react-icons/fa';
import './PrimarySearchPage.css';

function PrimarySearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState(accounts);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [filters, setFilters] = useState({ status: '', date: '', keyword: '' });

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
    <div className="primary-search-container">
      <h1 className="title">Accounts</h1>
      <button onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)} className="filter-button">
        <FaFilter /> Filters
      </button>
      {isFilterPanelOpen && (
        <div className="filter-panel">
          <button onClick={() => setIsFilterPanelOpen(false)} className="close-button">&times;</button>
          <h2 className="filter-title">Filters</h2>
          <div className="filter-section">
            <label>Status</label>
            <select name="status" onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
              <option value="">All</option>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
              <option value="collections">Collections</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
          <div className="filter-section">
            <label>Date Created</label>
            <input type="date" onChange={(e) => setFilters({ ...filters, date: e.target.value })} />
          </div>
          <div className="filter-section">
            <label>Keyword</label>
            <input type="text" placeholder="Search company or contact..." onChange={(e) => setFilters({ ...filters, keyword: e.target.value })} />
          </div>
          <button onClick={applyFilters} className="apply-filters">Apply Filters</button>
        </div>
      )}
      <table className="search-table">
        <thead>
          <tr>
            {["accountNumber", "companyName", "contactName", "phoneNumber", "email", "accountStatus", "virtualCompany"].map(column => (
              <th key={column} className="sortable-header" onClick={() => requestSort(column)}>
                <div className="header-content">
                  <span className="header-text">{column.replace(/([A-Z])/g, " $1").trim()}</span>
                  {sortConfig.key === column ? (
                    sortConfig.direction === "ascending" ? <FaSortUp /> : <FaSortDown />
                  ) : (
                    <FaSortUp className="sort-icon" />
                  )}
                </div>
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
