const claims = []; // Array to store claims data

function showClaimForm() {
    hideAllSections();
    document.getElementById('claimForm').classList.remove('hidden');
}

function showClaimTracking() {
    hideAllSections();
    document.getElementById('claimTracking').classList.remove('hidden');
    renderClaims();
}

function showChatbot() {
    hideAllSections();
    document.getElementById('chatbot').classList.remove('hidden');
    initChatbot();
}

function hideAllSections() {
    document.getElementById('claimForm').classList.add('hidden');
    document.getElementById('claimTracking').classList.add('hidden');
    document.getElementById('chatbot').classList.add('hidden');
}

function submitClaim(event) {
    event.preventDefault();
    const policyNumber = document.getElementById('policyNumber').value;
    const incidentDate = document.getElementById('incidentDate').value;
    const description = document.getElementById('description').value;

    const newClaim = {
        claimNumber: `CLM00${claims.length + 1}`,
        status: 'In Review',
        dateSubmitted: new Date().toLocaleDateString(),
        policyNumber,
        incidentDate,
        description
    };

    claims.push(newClaim);
    alert('Claim submitted successfully!');
    document.getElementById('submissionForm').reset();
}

function renderClaims() {
    const tableBody = document.getElementById('claimsTableBody');
    tableBody.innerHTML = ''; // Clear previous entries

    claims.forEach(claim => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${claim.claimNumber}</td>
            <td>${claim.status}</td>
            <td>${claim.dateSubmitted}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Chatbot Integration (simulated for the demo)
function initChatbot() {
    const chatbox = document.getElementById('chatbox');
    chatbox.innerHTML = ''; // Clear previous chat
    chatbox.innerHTML += '<p>Chatbot: How can we assist you today?</p>';
}
