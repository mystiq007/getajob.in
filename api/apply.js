// CrewAI client stub - replace with real implementation later
const crewAI = {
  fillForm: async (resume, job) => {
    // Stub implementation
    return {
      status: 'submitted',
      message: 'Application submitted successfully'
    };
  }
};

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
    const result = await crewAI.fillForm(resume, job);
    jobStatus.set(job.id, result);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
} 