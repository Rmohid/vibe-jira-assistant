// src/components/JiraAIAssistant.jsx
import React, { useState, useEffect } from 'react';
import { Search, Loader2, Settings } from 'lucide-react';
import SettingsPanel from './SettingsPanel';
import TicketList from './TicketList';
import { getJiraConfig, getAIConfig } from '../services/storage';
import { simulateProcessTickets } from '../services/api';

const JiraAIAssistant = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [jiraConfig, setJiraConfig] = useState(getJiraConfig());
  const [aiConfig, setAiConfig] = useState(getAIConfig());
  const [prompt, setPrompt] = useState('');
  const [results, setResults] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);
  const [error, setError] = useState('');

  // Check if configuration is complete on mount and when config changes
  useEffect(() => {
    const hasJiraConfig = jiraConfig.domain && jiraConfig.apiKey && jiraConfig.email;
    const hasAiConfig = aiConfig.provider && aiConfig.apiKey;
    setIsConfigured(hasJiraConfig && hasAiConfig);
  }, [jiraConfig, aiConfig]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isConfigured) {
      setError('Please configure your Jira and AI settings first');
      setShowSettings(true);
      return;
    }
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      // In a real app, we would call the backend API
      // For demo purposes, we're using a simulated response
      const results = await simulateProcessTickets(prompt);
      setResults(results);
    } catch (err) {
      setError('Error processing your request. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-indigo-700 text-white py-4 px-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold">Jira AI Assistant</h1>
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center text-sm bg-indigo-600 hover:bg-indigo-500 py-2 px-3 rounded-md transition duration-200"
          >
            <Settings className="w-4 h-4 mr-1" />
            Settings
          </button>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-6 max-w-4xl">
        {/* Settings Panel */}
        {showSettings && (
          <SettingsPanel 
            jiraConfig={jiraConfig}
            aiConfig={aiConfig}
            onUpdateJiraConfig={setJiraConfig}
            onUpdateAiConfig={setAiConfig}
            onClose={() => setShowSettings(false)}
          />
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="mb-4">
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-1">
              What would you like to find in your Jira backlog?
            </label>
            <div className="relative">
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Example: Find all high priority bugs assigned to me that haven't been updated in the last week"
                className="w-full px-3 py-2 border border-gray-300 rounded-md pr-10 text-sm min-h-24"
                disabled={isLoading}
              />
            </div>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-800 text-sm rounded-md">
              {error}
            </div>
          )}
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-4 rounded-md flex items-center text-sm font-medium transition duration-200 disabled:bg-indigo-300"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Process Backlog
                </>
              )}
            </button>
          </div>
        </form>

        {/* Results */}
        {results.length > 0 && (
          <TicketList tickets={results} jiraDomain={jiraConfig.domain} />
        )}
      </main>

      <footer className="bg-gray-100 text-center py-4 text-sm text-gray-600">
        Jira AI Assistant - Connect your Jira and AI services to process tickets effortlessly
      </footer>
    </div>
  );
};

export default JiraAIAssistant;
