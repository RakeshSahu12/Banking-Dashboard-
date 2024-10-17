

// Set initial balance
let balance = 1000;


const balanceDisplay = document.getElementById('balance');
const depositAmountInput = document.getElementById('deposit-amount');
const withdrawAmountInput = document.getElementById('withdraw-amount');
const depositBtn = document.getElementById('deposit-btn');
const withdrawBtn = document.getElementById('withdraw-btn');


function updateBalance() {
    balanceDisplay.textContent = balance.toFixed(2);  // Display balance with 2 decimal places
}


depositBtn.addEventListener('click', () => {
    const depositAmount = parseFloat(depositAmountInput.value);

    if (depositAmount > 0) {
        balance += depositAmount;
        updateBalance();
        depositAmountInput.value = '';  
    } else {
        alert('Please enter a valid deposit amount');
    }
});


withdrawBtn.addEventListener('click', () => {
    const withdrawAmount = parseFloat(withdrawAmountInput.value);

    if (withdrawAmount > 0 && withdrawAmount <= balance) {
        balance -= withdrawAmount;
        updateBalance();
        withdrawAmountInput.value = '';  // Clear input after withdrawal
    } else if (withdrawAmount > balance) {
        alert('Insufficient funds. Withdrawal amount exceeds current balance.');
    } else {
        alert('Please enter a valid withdrawal amount');
    }
});

// Initial balance display
updateBalance();
