// CrewAI client stub - replace with real implementation later
const crewAI = {
  scoreFit: async (resume, job) => {
    // Stub implementation
    return {
      score: Math.random() * 100,
      feedback: 'Sample feedback'
    };
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
    const { resume, jobs } = req.body;
    const scoredJobs = await Promise.all(
      jobs.map(async (job) => {
        const score = await crewAI.scoreFit(resume, job);
        return { ...job, ...score };
      })
    );
    res.status(200).json({ jobs: scoredJobs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
} 