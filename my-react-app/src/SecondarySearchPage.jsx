function SecondarySearchPage({ onClose }) {
  return (
    <div className="absolute right-0 top-0 bg-white p-4 shadow-lg w-80 border rounded h-screen">
      <button onClick={onClose} className="text-right block w-full">&times;</button>
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      <div className="mb-4">
        <label className="block mb-1">Status</label>
        <select className="p-2 border rounded w-full">
          <option value="">All</option>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
      </div>
    </div>
  );
}

export default SecondarySearchPage;
// function SecondarySearchPage() {
//   const [filters, setFilters] = useState({ status: "", date: "", keyword: "" });
//   const [filteredResults, setFilteredResults] = useState(accounts);
//   const [isFilterOpen, setIsFilterOpen] = useState(false);

//   const handleFilterChange = (e) => {
//     setFilters({ ...filters, [e.target.name]: e.target.value });
//   };

//   const applyFilters = () => {
//     let results = accounts;
//     if (filters.status) {
//       results = results.filter(account => account.accountStatus.toLowerCase() === filters.status.toLowerCase());
//     }
//     if (filters.date) {
//       results = results.filter(account => account.creationDate === filters.date);
//     }
//     if (filters.keyword) {
//       results = results.filter(account => 
//         account.companyName.toLowerCase().includes(filters.keyword.toLowerCase()) ||
//         account.contactName.toLowerCase().includes(filters.keyword.toLowerCase())
//       );
//     }
//     setFilteredResults(results);
//   };

//   return (
//     <div className="relative">
//       <h1 className="text-2xl font-bold mb-4">Advanced Search</h1>
//       <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="p-2 bg-gray-200 rounded">{isFilterOpen ? "Close Filters" : "Open Filters"}</button>
//       {isFilterOpen && (
//         <div className="absolute right-0 top-0 bg-white p-4 shadow-lg w-80 border rounded h-screen">
//           <button onClick={() => setIsFilterOpen(false)} className="text-right block w-full">&times;</button>
//           <h2 className="text-lg font-semibold mb-4">Filters</h2>
//           <div className="mb-4">
//             <label className="block mb-1">Status</label>
//             <select name="status" onChange={handleFilterChange} className="p-2 border rounded w-full">
//               <option value="">All</option>
//               <option value="open">Open</option>
//               <option value="closed">Closed</option>
//               <option value="collections">Collections</option>
//               <option value="suspended">Suspended</option>
//             </select>
//           </div>
//           <div className="mb-4">
//             <label className="block mb-1">Date Created</label>
//             <input type="date" name="date" onChange={handleFilterChange} className="p-2 border rounded w-full" />
//           </div>
//           <div className="mb-4">
//             <label className="block mb-1">Keyword</label>
//             <input type="text" name="keyword" placeholder="Search company or contact..." onChange={handleFilterChange} className="p-2 border rounded w-full" />
//           </div>
//           <button onClick={applyFilters} className="w-full p-2 bg-blue-500 text-white rounded">Apply Filters</button>
//         </div>
//       )}
//       <div className="mt-4 bg-white p-4 rounded shadow">
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="border-b">
//               <th className="p-2 text-left">Account Number</th>
//               <th className="p-2 text-left">Company</th>
//               <th className="p-2 text-left">Contact</th>
//               <th className="p-2 text-left">Phone Number</th>
//               <th className="p-2 text-left">Email</th>
//               <th className="p-2 text-left">Status</th>
//               <th className="p-2 text-left">Virtual Company</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredResults.map(account => (
//               <tr key={account.accountNumber} className="border-b">
//                 <td className="p-2">{account.accountNumber}</td>
//                 <td className="p-2">{account.companyName}</td>
//                 <td className="p-2">{account.contactName}</td>
//                 <td className="p-2">{account.phoneNumber}</td>
//                 <td className="p-2">{account.email}</td>
//                 <td className="p-2">{account.accountStatus}</td>
//                 <td className="p-2">{account.virtualCompany}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default SecondarySearchPage;