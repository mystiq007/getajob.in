const CREWAI_URL = process.env.CREWAI_URL || 'http://localhost:8000';

// In-memory job status store
const jobStatus = new Map();

export async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { resume, job } = req.body;
    // Forward to Python CrewAI backend
    const response = await fetch(`${CREWAI_URL}/fillForm`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resume, job })
    });
    const result = await response.json();
    jobStatus.set(job.id, result);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
} 