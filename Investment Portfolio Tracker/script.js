// script.js

// Initialize investments array and total value
let investments = [];
let totalValue = 0;

// Load investments from local storage
function loadInvestments() {
    const storedInvestments = JSON.parse(localStorage.getItem('investments')) || [];
    investments = storedInvestments;
    renderInvestmentList();
    calculateTotalValue();
}

// Render investment list in the table
function renderInvestmentList() {
    const investmentList = document.getElementById('investment-list').getElementsByTagName('tbody')[0];
    investmentList.innerHTML = ''; // Clear existing investments

    investments.forEach((investment, index) => {
        const row = investmentList.insertRow();
        row.innerHTML = `
            <td>${investment.name}</td>
            <td>$${investment.invested.toFixed(2)}</td>
            <td>$${investment.current.toFixed(2)}</td>
            <td>${((investment.current - investment.invested) / investment.invested * 100).toFixed(2)}%</td>
            <td>
                <button onclick="showUpdateForm(${index})">Update</button>
                <button onclick="removeInvestment(${index})">Remove</button>
            </td>
        `;
    });
}

// Calculate total value of investments
function calculateTotalValue() {
    totalValue = investments.reduce((acc, investment) => acc + investment.current, 0);
    document.getElementById('total-value').textContent = totalValue.toFixed(2);
    updateChart();
}

// Add investment from form input
document.getElementById('add-investment-btn').addEventListener('click', function() {
    const assetName = document.getElementById('asset-name').value.trim();
    const investedAmount = parseFloat(document.getElementById('invested-amount').value);
    const currentValue = parseFloat(document.getElementById('current-value').value);

    if (assetName && !isNaN(investedAmount) && !isNaN(currentValue)) {
        investments.push({ name: assetName, invested: investedAmount, current: currentValue });
        saveInvestments();
        renderInvestmentList();
        calculateTotalValue();
        clearForm();
    } else {
        alert('Please fill out all fields correctly.');
    }
});

// Update an investment
function showUpdateForm(index) {
    const investment = investments[index];
    document.getElementById('asset-name').value = investment.name;
    document.getElementById('invested-amount').value = investment.invested;
    document.getElementById('current-value').value = investment.current;
    
    document.getElementById('add-investment-btn').style.display = 'none';
    const updateBtn = document.createElement('button');
    updateBtn.textContent = 'Update Investment';
    updateBtn.onclick = function() {
        const updatedCurrentValue = parseFloat(document.getElementById('current-value').value);
        if (!isNaN(updatedCurrentValue)) {
            investments[index].current = updatedCurrentValue;
            saveInvestments();
            renderInvestmentList();
            calculateTotalValue();
            clearForm();
            document.getElementById('add-investment-btn').style.display = 'block';
            updateBtn.remove();
        } else {
            alert('Please enter a valid current value.');
        }
    };
    document.querySelector('.add-investment').appendChild(updateBtn);
}

// Remove an investment
function removeInvestment(index) {
    investments.splice(index, 1);
    saveInvestments();
    renderInvestmentList();
    calculateTotalValue();
}

// Save investments to local storage
function saveInvestments() {
    localStorage.setItem('investments', JSON.stringify(investments));
}

// Clear form fields
function clearForm() {
    document.getElementById('asset-name').value = '';
    document.getElementById('invested-amount').value = '';
    document.getElementById('current-value').value = '';
}

// Chart.js setup for pie chart visualization
const ctx = document.getElementById('portfolio-chart').getContext('2d');
let portfolioChart;

function updateChart() {
    const labels = investments.map(investment => investment.name);
    const data = investments.map(investment => investment.current);
    
    if (portfolioChart) {
        portfolioChart.destroy();
    }
    
    portfolioChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: data.map(() => `#${Math.floor(Math.random()*16777215).toString(16)}`),
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                }
            }
        }
    });
}

// Load investments on page load
window.onload = loadInvestments;
