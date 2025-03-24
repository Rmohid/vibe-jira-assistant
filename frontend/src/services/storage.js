// src/services/storage.js

/**
 * Get a value from localStorage with optional default
 * @param {string} key - Storage key
 * @param {*} defaultValue - Default value if key not found
 * @returns {*} - Stored value or default
 */
export const getFromStorage = (key, defaultValue = null) => {
  try {
    const value = localStorage.getItem(key);
    if (value === null) return defaultValue;
    return JSON.parse(value);
  } catch (error) {
    console.error(`Error retrieving ${key} from localStorage:`, error);
    return defaultValue;
  }
};

/**
 * Save a value to localStorage
 * @param {string} key - Storage key
 * @param {*} value - Value to store
 * @returns {boolean} - Success status
 */
export const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
    return false;
  }
};

/**
 * Remove a value from localStorage
 * @param {string} key - Storage key
 * @returns {boolean} - Success status
 */
export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error);
    return false;
  }
};

/**
 * Clear all app-related data from localStorage
 * @returns {boolean} - Success status
 */
export const clearAppStorage = () => {
  try {
    const appKeys = [
      'jiraDomain',
      'jiraApiKey',
      'jiraEmail', 
      'jiraProject',
      'aiProvider',
      'aiApiKey'
    ];
    
    appKeys.forEach(key => localStorage.removeItem(key));
    return true;
  } catch (error) {
    console.error('Error clearing app storage:', error);
    return false;
  }
};

/**
 * Get all Jira configuration from localStorage
 * @returns {Object} - Jira configuration object
 */
export const getJiraConfig = () => {
  return {
    domain: getFromStorage('jiraDomain', ''),
    apiKey: getFromStorage('jiraApiKey', ''),
    email: getFromStorage('jiraEmail', ''),
    project: getFromStorage('jiraProject', '')
  };
};

/**
 * Get all AI configuration from localStorage
 * @returns {Object} - AI configuration object
 */
export const getAIConfig = () => {
  return {
    provider: getFromStorage('aiProvider', 'claude'),
    apiKey: getFromStorage('aiApiKey', '')
  };
};
