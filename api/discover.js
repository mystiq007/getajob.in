// CrewAI client stub - replace with real implementation later
const crewAI = {
  discoverJobs: async (resume) => {
    // Stub implementation
    return [
      { id: '1', title: 'Software Engineer', company: 'Tech Corp' },
      { id: '2', title: 'Full Stack Developer', company: 'Startup Inc' }
    ];
  }
};

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
    const { resume } = req.body;
    const jobs = await crewAI.discoverJobs(resume);
    res.status(200).json({ jobs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
} 