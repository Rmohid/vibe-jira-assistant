# Jira AI Assistant

![Jira AI Assistant](https://img.shields.io/badge/Jira-AI%20Assistant-blue?style=for-the-badge&logo=jira&logoColor=white)
![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

A modern web application that uses AI to process and analyze your Jira backlog based on natural language prompts. This tool bridges the gap between Jira's powerful ticket management and the intuitive understanding of AI language models.

## ✨ Features

- 🔍 **Natural Language Processing** - Process your Jira backlog with intuitive, plain English prompts
- 🤖 **Multiple AI Providers** - Supports Claude, Perplexity, and OpenRouter AI services
- 🔒 **Secure Local Storage** - Credentials stored only in your browser, never sent to our servers
- 🎨 **Modern UI** - Clean, responsive design with Tailwind CSS
- 🔗 **Direct Ticket Links** - Click ticket IDs to open them directly in your Jira instance
- ⚡ **Fast Simulation Mode** - Test functionality without real APIs during development

## 📋 Table of Contents

- [Installation](#-installation)
  - [Prerequisites](#prerequisites)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Usage](#-usage)
  - [Configuration](#configuration)
  - [Processing Backlog](#processing-backlog)
  - [Example Prompts](#example-prompts)
- [Architecture](#-architecture)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Development](#-development)
  - [Project Structure](#project-structure)
  - [Available Scripts](#available-scripts)
- [Security Considerations](#-security-considerations)
- [License](#-license)

## 🚀 Installation

### Prerequisites

- [Node.js](https://nodejs.org/) 14.x or higher
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- Jira API credentials (email and API token)
- API key for one of the supported AI services:
  - [Claude](https://anthropic.com/)
  - [Perplexity](https://perplexity.ai/)
  - [OpenRouter](https://openrouter.ai/)

### Frontend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/rmohid/vibe-jira-assistant.git
   cd vibe-jira-assistant/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory (optional, for custom configuration):
   ```
   REACT_APP_API_URL=http://localhost:3001/api
   ```

4. Start the development server:
   ```bash
   npm start
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd ../backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory:
   ```
   PORT=3001
   # Add any other environment variables here
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

## 🎮 Usage

### Configuration

1. Open the application in your browser (http://localhost:3000 by default)
2. Click the "Settings" button in the top-right corner
3. Enter your Jira credentials:
   - Jira Domain (e.g., `https://your-company.atlassian.net`)
   - Email address associated with your Jira account
   - API token (generate from [Atlassian Account Settings](https://id.atlassian.com/manage-profile/security/api-tokens))
   - Optional: Project key to filter results (e.g., `PROJ`)
4. Select your preferred AI provider and enter your API key
5. Close the settings panel to save your configuration

### Processing Backlog

1. Enter a natural language prompt describing what you want to find in your Jira backlog
2. Click "Process Backlog" to retrieve matching tickets
3. Review the results, which include:
   - Ticket key (clickable to open in Jira)
   - Priority indicator
   - Summary
   - Expandable details with full description and AI analysis

### Example Prompts

- "Find all high priority bugs assigned to me"
- "Show tickets similar to PROJ-123"
- "List all authentication-related issues that haven't been updated in the last week"
- "Identify tickets with potential security implications"
- "Find duplicated tickets in the current sprint"

## 🏗️ Architecture

### Frontend

- **React**: Component-based UI
- **Tailwind CSS**: Utility-first styling
- **LocalStorage**: Secure credential management
- **Axios**: API communication

### Backend

- **Express**: Web server framework
- **Axios**: External API requests
- **Jira API**: Ticket retrieval and management
- **AI Services**: Natural language processing of tickets

## 💻 Development

### Project Structure

```
vibe-jira-assistant/
├── frontend/                        # React frontend
│   ├── public/                      # Static files
│   ├── src/
│   │   ├── components/              # React components
│   │   │   ├── JiraAIAssistant.jsx  # Main component
│   │   │   ├── SettingsPanel.jsx    # Settings panel
│   │   │   ├── TicketList.jsx       # Ticket listing
│   │   │   └── TicketItem.jsx       # Individual ticket component
│   │   ├── services/                # Service modules
│   │   │   ├── api.js               # API communication
│   │   │   └── storage.js           # Local storage handling
│   │   ├── App.js                   # Root component
│   │   ├── index.js                 # Entry point
│   │   └── index.css                # Tailwind imports
│   ├── package.json                 # Frontend dependencies
│   ├── tailwind.config.js           # Tailwind CSS config
│   └── postcss.config.js            # PostCSS configuration
│
└── backend/                         # Express backend
    ├── server.js                    # Main server code
    ├── package.json                 # Backend dependencies
    └── .env                         # Environment variables
```

### Available Scripts

#### Frontend

- `npm start`: Start development server
- `npm build`: Build for production
- `npm test`: Run tests
- `npm eject`: Eject from Create React App

#### Backend

- `npm start`: Start production server
- `npm run dev`: Start server with hot-reload (requires nodemon)

## 🔒 Security Considerations

- **API Keys**: Stored only in the user's browser localStorage
- **Credentials**: Never sent to third-party servers
- **Backend Proxy**: All API requests to Jira are made through the backend to avoid exposing credentials
- **No Server Storage**: We don't store any user data on our servers

## 📄 License

MIT License

## ⚠️ Disclaimer

This software was AI-generated. While care has been taken to ensure it works as described, it may contain bugs or security issues. Use at your own risk and review the code before deploying to production environments.

---

Made with ❤️ using Claude AI
