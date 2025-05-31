const BACKEND_URL = 'http://localhost:8001';

// DOM Elements
const resumeInput = document.getElementById('resume');
const findJobsBtn = document.getElementById('findJobs');
const autoApplyBtn = document.getElementById('autoApply');
const highFitList = document.getElementById('highFit');
const reviewFitList = document.getElementById('reviewFit');
const statusDiv = document.getElementById('status');

// State
let currentResume = null;
let discoveredJobs = [];

// Event Listeners
findJobsBtn.addEventListener('click', handleFindJobs);
autoApplyBtn.addEventListener('click', handleAutoApply);
resumeInput.addEventListener('change', handleResumeUpload);

// Resume Upload Handler
function handleResumeUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            currentResume = e.target.result;
            findJobsBtn.disabled = false;
        };
        reader.readAsText(file);
    }
}

// Find Jobs Handler
async function handleFindJobs() {
    if (!currentResume) return;
    
    try {
        statusDiv.textContent = 'Status: Discovering jobs...';
        
        // Discover jobs
        const discoverResponse = await fetch(`${BACKEND_URL}/discoverJobs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ resume: currentResume })
        });
        const { jobs } = await discoverResponse.json();
        
        // Filter jobs
        const filterResponse = await fetch(`${BACKEND_URL}/scoreFit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ resume: currentResume, jobs })
        });
        const { jobs: scoredJobs } = await filterResponse.json();
        
        discoveredJobs = scoredJobs;
        renderJobs(scoredJobs);
        autoApplyBtn.disabled = false;
        statusDiv.textContent = 'Status: Jobs found and scored';
    } catch (error) {
        statusDiv.textContent = `Status: Error - ${error.message}`;
    }
}

// Auto Apply Handler
async function handleAutoApply() {
    if (!discoveredJobs.length) return;
    
    try {
        statusDiv.textContent = 'Status: Starting auto-apply...';
        autoApplyBtn.disabled = true;
        
        for (const job of discoveredJobs) {
            const response = await fetch(`${BACKEND_URL}/fillForm`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ resume: currentResume, job })
            });
            const result = await response.json();
            updateJobStatus(job.id, result);
        }
        
        statusDiv.textContent = 'Status: Auto-apply completed';
    } catch (error) {
        statusDiv.textContent = `Status: Error - ${error.message}`;
    }
}

// Render Jobs
function renderJobs(jobs) {
    highFitList.innerHTML = '';
    reviewFitList.innerHTML = '';
    
    jobs.forEach(job => {
        const li = document.createElement('li');
        li.className = 'job-item';
        li.innerHTML = `
            <strong>${job.title}</strong><br>
            ${job.company}<br>
            Score: ${Math.round(job.score)}%
        `;
        
        if (job.score >= 70) {
            highFitList.appendChild(li);
        } else {
            reviewFitList.appendChild(li);
        }
    });
}

// Update Job Status (stub for now)
function updateJobStatus(jobId, status) {
    // You can implement this if you add a status endpoint to the backend
}

// Comment out status polling since /status endpoint does not exist
// setInterval(async () => {
//     try {
//         const response = await fetch('/api/status');
//         const { statuses } = await response.json();
//         Object.entries(statuses).forEach(([jobId, status]) => {
//             updateJobStatus(jobId, status);
//         });
//     } catch (error) {
//         console.error('Status poll error:', error);
//     }
// }, 2000); 