// src/services/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

/**
 * Process tickets with Jira API and AI
 * @param {Object} jiraConfig - Jira configuration
 * @param {Object} aiConfig - AI service configuration
 * @param {string} prompt - User's natural language prompt
 * @returns {Promise<Array>} - Array of matching tickets
 */
export const processTickets = async (jiraConfig, aiConfig, prompt) => {
  try {
    const response = await axios.post(`${API_URL}/process`, {
      jiraConfig,
      aiConfig,
      prompt
    });
    
    return response.data.results;
  } catch (error) {
    console.error('Error processing tickets:', error.response?.data || error.message);
    throw new Error(error.response?.data?.error || 'Failed to process tickets');
  }
};

/**
 * Check API server health
 * @returns {Promise<boolean>} - True if server is healthy
 */
export const checkHealth = async () => {
  try {
    const response = await axios.get(`${API_URL}/health`);
    return response.data.status === 'ok';
  } catch (error) {
    console.error('Health check failed:', error);
    return false;
  }
};

// For demo/development purposes only - simulate API with local processing
export const simulateProcessTickets = (prompt) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const lowerPrompt = prompt.toLowerCase();
      
      let results = [];
      
      if (lowerPrompt.includes('similar')) {
        results = [
          { key: 'PROJ-123', summary: 'API Authentication Fails Intermittently', description: 'Users report random authentication failures when using the mobile API', priority: 'High' },
          { key: 'PROJ-145', summary: 'Authentication Token Expires Too Quickly', description: 'Auth tokens are expiring before the documented TTL', priority: 'Medium' },
          { key: 'PROJ-201', summary: 'SSO Integration Fails With Specific Providers', description: 'Authentication with Okta sometimes fails during peak usage', priority: 'High' }
        ];
      } else if (lowerPrompt.includes('high priority') || lowerPrompt.includes('urgent')) {
        results = [
          { key: 'PROJ-089', summary: 'Production Database Connection Pool Exhaustion', description: 'Connection pool is being depleted during high traffic periods', priority: 'Critical' },
          { key: 'PROJ-123', summary: 'API Authentication Fails Intermittently', description: 'Users report random authentication failures when using the mobile API', priority: 'High' },
          { key: 'PROJ-201', summary: 'SSO Integration Fails With Specific Providers', description: 'Authentication with Okta sometimes fails during peak usage', priority: 'High' }
        ];
      } else if (lowerPrompt.includes('bug') || lowerPrompt.includes('defect')) {
        results = [
          { key: 'PROJ-067', summary: 'Form Submission Fails on Safari', description: 'Users on Safari cannot submit the contact form due to JS error', priority: 'Medium' },
          { key: 'PROJ-123', summary: 'API Authentication Fails Intermittently', description: 'Users report random authentication failures when using the mobile API', priority: 'High' },
          { key: 'PROJ-189', summary: 'Incorrect Calculation in Report Generator', description: 'Monthly summary reports show incorrect totals for international transactions', priority: 'Medium' }
        ];
      } else {
        results = [
          { key: 'PROJ-042', summary: 'Implement New Dashboard Widgets', description: 'Add customizable widgets to the user dashboard', priority: 'Low' },
          { key: 'PROJ-089', summary: 'Production Database Connection Pool Exhaustion', description: 'Connection pool is being depleted during high traffic periods', priority: 'Critical' },
          { key: 'PROJ-123', summary: 'API Authentication Fails Intermittently', description: 'Users report random authentication failures when using the mobile API', priority: 'High' },
          { key: 'PROJ-201', summary: 'SSO Integration Fails With Specific Providers', description: 'Authentication with Okta sometimes fails during peak usage', priority: 'High' }
        ];
      }
      
      resolve(results);
    }, 1500); // Simulate network delay
  });
};
