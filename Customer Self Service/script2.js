const knowledgeBase = [
    { question: "How do I file a claim?", answer: "To file a claim, please fill out the claim form." },
    { question: "What’s my claim status?", answer: "You can check your claim status on the tracking page." },
    // Add more articles as needed
];

document.getElementById('search').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const results = knowledgeBase.filter(article => article.question.toLowerCase().includes(query));
    displaySearchResults(results);
});

function displaySearchResults(results) {
    const resultsDiv = document.getElementById('searchResults');
    resultsDiv.innerHTML = ''; // Clear previous results

    results.forEach(result => {
        const p = document.createElement('p');
        p.innerText = result.question;
        resultsDiv.appendChild(p);
    });
}
