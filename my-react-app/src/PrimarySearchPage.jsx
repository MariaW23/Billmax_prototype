import React, { useState } from 'react';
import { accounts } from './data';
import { FaSortUp, FaSortDown, FaSearch, FaAngleDoubleLeft } from 'react-icons/fa';
import './PrimarySearchPage.css';

function PrimarySearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState(accounts);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [filters, setFilters] = useState({ status: [], date: '', keyword: '' });

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
              <th key={column} className="sortable-header" onClick={() => requestSort(column)}>
                <div className="header-content">
                  <span className="header-text">{column.replace(/([A-Z])/g, ' $1').trim()}</span>
                  {sortConfig.key === column ? (
                    sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />
                  ) : (
                    <FaSortUp className="sort-icon" />
                  )}
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
