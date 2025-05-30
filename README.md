# GetAJob.in

An automated job search and application platform powered by CrewAI.

## Project Structure

```
/api
  discover.js          # POST → CrewAI discoverJobs
  filter.js            # POST → CrewAI scoreFit
  apply.js             # POST → CrewAI fillForm + Puppeteer stub
  status.js            # GET  → in-memory job status
/frontend
  index.html           # simple UI: résumé upload, lists, buttons
  scripts.js           # fetch wrappers for /api/* endpoints
/env
  .env.example         # placeholder for OPENAI_API_KEY, CREWAI_URL, etc.
```

## Setup

1. Copy `env/.env.example` to `env/.env` and fill in your API keys:
   ```bash
   cp env/.env.example env/.env
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Features

- Upload your résumé to discover matching jobs
- AI-powered job fit scoring
- Automated job application process
- Real-time application status tracking

## API Endpoints

- `POST /api/discover` - Find matching jobs based on résumé
- `POST /api/filter` - Score job fit for discovered positions
- `POST /api/apply` - Submit job application
- `GET /api/status` - Get application status updates

## Development

This is a work in progress. The current implementation includes:

- Basic project scaffolding
- Frontend UI with job discovery and application flow
- API endpoints with CrewAI stubs
- Status tracking system

## License

MIT 