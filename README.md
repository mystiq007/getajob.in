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

## CrewAI Python Backend

CrewAI is a Python framework for managing AI agents. To use it:

1. Install Python 3.10–3.12
2. Install CrewAI:
   ```bash
   pip install crewai
   ```
3. Scaffold a backend (see below for FastAPI example)
4. Expose endpoints for your Node.js API to call

## Example: FastAPI CrewAI Backend

```python
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"] ,
    allow_headers=["*"]
)

class ResumeRequest(BaseModel):
    resume: str

@app.post("/discoverJobs")
async def discover_jobs(req: ResumeRequest):
    # TODO: Call CrewAI logic here
    return {"jobs": [{"id": "1", "title": "Software Engineer", "company": "Tech Corp"}]}

@app.post("/scoreFit")
async def score_fit(req: Request):
    data = await req.json()
    # TODO: Call CrewAI logic here
    return {"jobs": [{"id": "1", "score": 95}]}

@app.post("/fillForm")
async def fill_form(req: Request):
    data = await req.json()
    # TODO: Call CrewAI logic here
    return {"status": "submitted", "message": "Application submitted"}
```

Run with:
```bash
uvicorn main:app --reload
```

## Connecting Node.js to Python CrewAI

In your Node.js API routes, use `fetch` or `axios` to call the Python backend:

```js
// Example in api/discover.js
const CREWAI_URL = process.env.CREWAI_URL || 'http://localhost:8000';

export async function handler(req, res) {
  // ...
  const response = await fetch(`${CREWAI_URL}/discoverJobs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resume })
  });
  const data = await response.json();
  // ...
}
``` 