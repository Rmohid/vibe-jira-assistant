// src/components/SettingsPanel.jsx
import React from 'react';
import { X, Info } from 'lucide-react';
import { saveToStorage } from '../services/storage';

const SettingsPanel = ({ 
  jiraConfig, 
  aiConfig, 
  onUpdateJiraConfig, 
  onUpdateAiConfig, 
  onClose 
}) => {
  // Update Jira configuration
  const updateJiraConfig = (field, value) => {
    const newConfig = { ...jiraConfig, [field]: value };
    onUpdateJiraConfig(newConfig);
    
    // Save to local storage
    saveToStorage(`jira${field.charAt(0).toUpperCase() + field.slice(1)}`, value);
  };

  // Update AI configuration
  const updateAiConfig = (field, value) => {
    const newConfig = { ...aiConfig, [field]: value };
    onUpdateAiConfig(newConfig);
    
    // Save to local storage
    saveToStorage(`ai${field.charAt(0).toUpperCase() + field.slice(1)}`, value);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 animate-fadeIn">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Configuration</h2>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Jira Settings */}
        <div className="space-y-4">
          <h3 className="text-md font-medium text-gray-700 border-b pb-2">Jira Configuration</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jira Domain
            </label>
            <input
              type="text"
              value={jiraConfig.domain}
              onChange={(e) => updateJiraConfig('domain', e.target.value)}
              placeholder="https://your-domain.atlassian.net"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={jiraConfig.email}
              onChange={(e) => updateJiraConfig('email', e.target.value)}
              placeholder="your-email@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              API Key
            </label>
            <input
              type="password"
              value={jiraConfig.apiKey}
              onChange={(e) => updateJiraConfig('apiKey', e.target.value)}
              placeholder="Your Jira API token"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Key (Optional)
            </label>
            <input
              type="text"
              value={jiraConfig.project}
              onChange={(e) => updateJiraConfig('project', e.target.value)}
              placeholder="e.g., PROJ"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
        </div>
        
        {/* AI Settings */}
        <div className="space-y-4">
          <h3 className="text-md font-medium text-gray-700 border-b pb-2">AI Configuration</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              AI Provider
            </label>
            <select
              value={aiConfig.provider}
              onChange={(e) => updateAiConfig('provider', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="claude">Claude</option>
              <option value="perplexity">Perplexity</option>
              <option value="openrouter">OpenRouter</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              API Key
            </label>
            <input
              type="password"
              value={aiConfig.apiKey}
              onChange={(e) => updateAiConfig('apiKey', e.target.value)}
              placeholder="Your AI service API key"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
          
          <div className="bg-blue-50 rounded p-3 mt-4">
            <div className="flex items-start">
              <Info className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-800">
                Your API keys are stored locally in your browser and are never sent to our servers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
