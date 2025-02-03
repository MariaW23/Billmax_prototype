import React, { useState } from 'react';
import { accounts } from './data';

// use professional-looking icons from font awesome: https://fontawesome.com/search?q=sort&o=r
import { FaSortUp, FaSortDown, FaSearch, FaAngleDoubleLeft, FaFilter, FaPlus, FaDownload, FaColumns, FaSave } from 'react-icons/fa';

import './PrimarySearchPage.css';

function PrimarySearchPage() {
  // set the initial default states:
  const [searchTerm, setSearchTerm] = useState('');

  // default is to show all the accounts from data.js
  const [filteredResults, setFilteredResults] = useState(accounts);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [filters, setFilters] = useState({ status: [], date: '', keyword: '' });

  // e as event that triggered this function
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const results = accounts.filter((account) =>
      // converts the individual accounts into string first and then select all the ones with any string that matches target string
      Object.values(account).some(value =>
        value.toString().toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
    setFilteredResults(results);
  };

  // key is the column that's being sorted
  const requestSort = (key) => {
    let direction = 'ascending';
    
    // if the column is already in ascending order, switch to descedning order; else defaults to ascending
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    // use ...filteredResults to create copy of filteredResults so don't modify original array (immutability)
    const sortedData = [...filteredResults].sort((a, b) => {
      // return -1 if a should be before b, 1 if after, 0 if the same
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });
    setFilteredResults(sortedData);
  };

  
  const toggleStatusFilter = (value) => {
    setFilters(prevFilters => {
      const newStatus = prevFilters.status.includes(value)
        ? prevFilters.status.filter(s => s !== value)
        : [...prevFilters.status, value];
      return { ...prevFilters, status: newStatus };
    });
  };

  const clearFilters = () => {
    setFilters({ status: [], date: '', keyword: '' });
    setFilteredResults(accounts);
  };

  const applyFilters = () => {
    let results = accounts;
    if (filters.status.length > 0) {
      results = results.filter(account => filters.status.includes(account.accountStatus.toLowerCase()));
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

      <div className="button-container">
        <div className="left-buttons">
          <button className="new-account-button"><FaPlus /> New Account</button>
          <button className="edit-columns-button"><FaColumns /> Edit Columns</button>
        </div>
        <div className="right-buttons">
          <button className="export-button"><FaDownload /> Export</button>
          <button className="save-options-button"><FaSave /> Save Options</button>
          <button onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)} className="filter-button"><FaFilter /> Filters</button>
        </div>
      </div>

      <button onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)} className="filter-toggle-button">
        <FaAngleDoubleLeft className={isFilterPanelOpen ? 'rotate-icon' : ''} />
      </button>
      <div className={`filter-panel ${isFilterPanelOpen ? 'open' : ''}`} style={{ right: isFilterPanelOpen ? '0' : '-100%' }}>
        <h2 className="filter-title">Filters</h2>
        <button onClick={clearFilters} className="clear-filters">Clear All</button>
        <div className="filter-section">
          <label>Status</label>
          <div className="checkbox-group">
            {['open', 'closed', 'collections', 'suspended'].map(status => (
              <label key={status}>
                <input type="checkbox" checked={filters.status.includes(status)} onChange={() => toggleStatusFilter(status)} /> {status.charAt(0).toUpperCase() + status.slice(1)}
              </label>
            ))}
          </div>
        </div>
        <div className="filter-section">
          <label>Date Created</label>
          <input type="date" value={filters.date} onChange={(e) => setFilters({ ...filters, date: e.target.value })} />
        </div>
        <div className="filter-section">
          <label>Keyword</label>
          <input type="text" placeholder="Search company or contact..." value={filters.keyword} onChange={(e) => setFilters({ ...filters, keyword: e.target.value })} />
        </div>
        <button onClick={applyFilters} className="apply-filters">Apply Filters</button>
      </div>

      <table className="search-table">
        <thead>
          <tr>
            {['accountNumber', 'companyName', 'contactName', 'phoneNumber', 'email', 'accountStatus', 'creationDate', 'virtualCompany'].map(column => (
              <th key={column} className="sortable-header">
                <div className="header-content">
                  <span className="header-text">{column.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <button className="sort-button" onClick={() => requestSort(column)}>
                    {sortConfig.key === column ? (sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />) : <FaSortUp />}
                  </button>
                </div>
                {column === 'accountStatus' ? (
                  <select onChange={handleSearch} className="status-dropdown">
                    <option value="">All</option>
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                    <option value="collections">Collections</option>
                    <option value="suspended">Suspended</option>
                  </select>
                ) : (
                  <div className="search-box-container">
                    <input 
                      type="text" 
                      onChange={handleSearch} 
                      placeholder="Search" 
                      className="search-box"
                    />
                    <FaSearch className="search-icon" />
                  </div>
                )}
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
              <td>{account.creationDate}</td>
              <td>{account.virtualCompany}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PrimarySearchPage;
