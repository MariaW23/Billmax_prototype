// AccountCard.js
import React from 'react';

function AccountCard({ account }) {
  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-xl font-bold">{account.companyName}</h2>
      <p>Account Number: {account.accountNumber}</p>
      <p>Contact Name: {account.contactName}</p>
      <p>Phone Number: {account.phoneNumber}</p>
      <p>Email: {account.email}</p>
      <p>Account Status: {account.accountStatus}</p>
      <p>Creation Date: {account.creationDate}</p>
    </div>
  );
}

export default AccountCard;
