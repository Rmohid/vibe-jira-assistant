// server.js - Express backend for Jira AI Assistant
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Jira API handler
async function fetchJiraTickets(config) {
  const { domain, email, apiKey, project } = config;
  
  const auth = Buffer.from(`${email}:${apiKey}`).toString('base64');
  
  try {
    // Base JQL query - can be expanded based on needs
    let jql = project ? `project = ${project}` : '';
    
    const response = await axios.get(`${domain}/rest/api/3/search`, {
      params: {
        jql,
        maxResults: 100,
        fields: 'summary,description,priority,status,assignee,created,updated'
      },
      headers: {
        'Authorization': `Basic ${auth}`,
        'Accept': 'application/json'
      }
    });
    
    return response.data.issues.map(issue => ({
      key: issue.key,
      summary: issue.fields.summary,
      description: issue.fields.description?.content?.[0]?.content?.[0]?.text || 'No description',
      priority: issue.fields.priority?.name || 'Unknown',
      status: issue.fields.status?.name || 'Unknown',
      assignee: issue.fields.assignee?.displayName || 'Unassigned',
      created: issue.fields.created,
      updated: issue.fields.updated
    }));
  } catch (error) {
    console.error('Error fetching from Jira API:', error.response?.data || error.message);
    throw new Error(error.response?.data?.errorMessages?.[0] || 'Failed to fetch Jira tickets');
  }
}

// AI processing handler
async function processWithAI(tickets, prompt, aiConfig) {
  const { provider, apiKey } = aiConfig;
  
  // Prepare tickets data for AI context
  const ticketsData = tickets.map(t => 
    `Key: ${t.key}, Summary: ${t.summary}, Priority: ${t.priority}, Status: ${t.status}, Assignee: ${t.assignee}`
  ).join('\n');
  
  // Construct system prompt
  const systemPrompt = `You are an AI assistant that helps process Jira tickets. 
Given a list of tickets and a user query, identify the relevant tickets that match the query criteria.
For each matching ticket, explain briefly why it matches the criteria.
Be concise and factual. Return only tickets that match the criteria.`;

  const userPrompt = `Here are the tickets:\n${ticketsData}\n\nQuery: ${prompt}\n\nReturn only the matching tickets with their keys and a brief explanation.`;
  
  try {
    let response;
    
    switch(provider.toLowerCase()) {
      case 'claude':
        response = await axios.post('https://api.anthropic.com/v1/messages', {
          model: 'claude-3-opus-20240229',
          max_tokens: 1024,
          system: systemPrompt,
          messages: [{ role: 'user', content: userPrompt }]
        }, {
          headers: {
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
            'Content-Type': 'application/json'
          }
        });
        return parseAIResponse(response.data.content[0].text, tickets);
        
      case 'perplexity':
        response = await axios.post('https://api.perplexity.ai/chat/completions', {
          model: 'sonar-medium-online',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ]
        }, {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          }
        });
        return parseAIResponse(response.data.choices[0].message.content, tickets);
        
      case 'openrouter':
        response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
          model: 'anthropic/claude-3-opus',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ]
        }, {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          }
        });
        return parseAIResponse(response.data.choices[0].message.content, tickets);
        
      default:
        throw new Error('Unsupported AI provider');
    }
  } catch (error) {
    console.error('Error processing with AI:', error.response?.data || error.message);
    throw new Error('Failed to process tickets with AI service');
  }
}

// Helper function to parse AI response and match with ticket data
function parseAIResponse(aiResponse, allTickets) {
  // Extract ticket keys from the AI response
  const ticketKeyRegex = /([A-Z]+-\d+)/g;
  const mentionedKeys = [...aiResponse.matchAll(ticketKeyRegex)].map(match => match[0]);
  const uniqueKeys = [...new Set(mentionedKeys)];
  
  // Match with full ticket data
  return uniqueKeys
    .map(key => {
      const ticket = allTickets.find(t => t.key === key);
      if (!ticket) return null;
      
      // Try to extract the explanation for this ticket
      const explanationRegex = new RegExp(`${key}[^\\n]*\\n([^\\n]+)`, 'i');
      const explanationMatch = aiResponse.match(explanationRegex);
      const explanation = explanationMatch ? explanationMatch[1].trim() : '';
      
      return {
        ...ticket,
        aiExplanation: explanation
      };
    })
    .filter(Boolean); // Remove any null entries
}

// API Routes
app.post('/api/process', async (req, res) => {
  try {
    const { jiraConfig, aiConfig, prompt } = req.body;
    
    // Validate required inputs
    if (!jiraConfig || !aiConfig || !prompt) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
    
    // Fetch tickets from Jira
    const tickets = await fetchJiraTickets(jiraConfig);
    
    // Process with AI
    const results = await processWithAI(tickets, prompt, aiConfig);
    
    res.json({ results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
