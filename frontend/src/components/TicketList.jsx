// src/components/TicketList.jsx
import React from 'react';
import TicketItem from './TicketItem';

const TicketList = ({ tickets, jiraDomain }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-fadeIn">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Results</h2>
      
      <div className="mb-2 text-sm text-gray-600">
        Found {tickets.length} matching ticket{tickets.length !== 1 ? 's' : ''}
      </div>
      
      <ul className="divide-y divide-gray-200">
        {tickets.map((ticket) => (
          <TicketItem key={ticket.key} ticket={ticket} jiraDomain={jiraDomain} />
        ))}
      </ul>
    </div>
  );
};

export default TicketList;
