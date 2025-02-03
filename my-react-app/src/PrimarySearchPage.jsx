import React, { useState } from 'react';
import { accounts } from './data';

function PrimarySearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState(accounts);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const results = accounts.filter((account) =>
      Object.values(account).some(value =>
        value.toString().toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
    setFilteredResults(results);
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Accounts</h1>
      <table className="w-full border-collapse border rounded shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Account Number <input type="text" onChange={handleSearch} className="w-full p-1 border rounded"/></th>
            <th className="p-2 border">Company <input type="text" onChange={handleSearch} className="w-full p-1 border rounded"/></th>
            <th className="p-2 border">Contact <input type="text" onChange={handleSearch} className="w-full p-1 border rounded"/></th>
            <th className="p-2 border">Phone Number <input type="text" onChange={handleSearch} className="w-full p-1 border rounded"/></th>
            <th className="p-2 border">Email <input type="text" onChange={handleSearch} className="w-full p-1 border rounded"/></th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Virtual Company</th>
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

// import { accounts } from "./data";
// import SecondarySearchPage from "./SecondarySearchPage"

// function PrimarySearchPage() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredResults, setFilteredResults] = useState(accounts);
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
//   const [isFilterOpen, setIsFilterOpen] = useState(false);

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const executeSearch = () => {
//     let results = accounts.filter(account =>
//       Object.values(account).some(value =>
//         value.toString().toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     );
//     applySorting(results);
//   };

//   const applySorting = (data) => {
//     if (sortConfig.key) {
//       data.sort((a, b) => {
//         if (a[sortConfig.key] < b[sortConfig.key]) {
//           return sortConfig.direction === "ascending" ? -1 : 1;
//         }
//         if (a[sortConfig.key] > b[sortConfig.key]) {
//           return sortConfig.direction === "ascending" ? 1 : -1;
//         }
//         return 0;
//       });
//     }
//     setFilteredResults([...data]);
//   };

//   const requestSort = (key) => {
//     let direction = "ascending";
//     if (sortConfig.key === key && sortConfig.direction === "ascending") {
//       direction = "descending";
//     }
//     setSortConfig({ key, direction });
//     applySorting(filteredResults);
//   };

//   return (
//     <div className="bg-white p-6 rounded shadow relative">
//       <h1 className="text-2xl font-bold mb-4">Accounts</h1>
//       <div className="flex mb-4">
//         <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search..." className="border p-2 rounded w-full mr-2" />
//         <button onClick={executeSearch} className="bg-blue-500 text-white px-4 py-2 rounded">Search</button>
//         <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="border px-4 py-2 rounded">Filters</button>
//       </div>
//       {isFilterOpen && (
//         <SecondarySearchPage />
//       )}
//       <table className="w-full border-collapse border rounded shadow">
//         <thead className="bg-gray-200">
//           <tr>
//             {["accountNumber", "companyName", "contactName", "phoneNumber", "email", "accountStatus", "virtualCompany"].map(column => (
//               <th key={column} className="p-2 border cursor-pointer" onClick={() => requestSort(column)}>
//                 {column.replace(/([A-Z])/g, " $1").trim()} {sortConfig.key === column ? (sortConfig.direction === "ascending" ? "↑" : "↓") : ""}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {filteredResults.map(account => (
//             <tr key={account.accountNumber} className="border">
//               <td className="p-2 border">{account.accountNumber}</td>
//               <td className="p-2 border">{account.companyName}</td>
//               <td className="p-2 border">{account.contactName}</td>
//               <td className="p-2 border">{account.phoneNumber}</td>
//               <td className="p-2 border">{account.email}</td>
//               <td className="p-2 border">{account.accountStatus}</td>
//               <td className="p-2 border">{account.virtualCompany}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default PrimarySearchPage;