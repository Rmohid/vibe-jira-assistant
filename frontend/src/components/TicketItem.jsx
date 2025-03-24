// src/components/TicketItem.jsx
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

const TicketItem = ({ ticket, jiraDomain }) => {
  const [expanded, setExpanded] = useState(false);
  
  // Priority color mapping
  const priorityColors = {
    Critical: 'bg-red-100 text-red-800',
    High: 'bg-orange-100 text-orange-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Low: 'bg-green-100 text-green-800'
  };

  // Generate the Jira ticket URL
  const getTicketUrl = () => {
    // Default to a placeholder domain if none provided
    const domain = jiraDomain || 'your-domain.atlassian.net';
    // Remove any trailing slashes from domain
    const cleanDomain = domain.replace(/\/+$/, '');
    return `https://${cleanDomain}/browse/${ticket.key}`;
  };
  
  return (
    <li className="py-4">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center">
            <a 
              href={getTicketUrl()} 
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 font-medium mr-2 flex items-center"
            >
              {ticket.key}
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
            <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[ticket.priority] || 'bg-gray-100'}`}>
              {ticket.priority}
            </span>
          </div>
          <h3 className="text-gray-900 font-medium mt-1">{ticket.summary}</h3>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-gray-500 hover:text-gray-700"
        >
          {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>
      
      {expanded && (
        <div className="mt-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
          {ticket.description}
          
          {ticket.aiExplanation && (
            <div className="mt-2 pt-2 border-t border-gray-200">
              <p className="text-xs font-medium text-gray-500 mb-1">AI Analysis:</p>
              <p>{ticket.aiExplanation}</p>
            </div>
          )}
        </div>
      )}
    </li>
  );
};

export default TicketItem;
