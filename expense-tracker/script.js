let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function displayTransactions() {
  const list = document.getElementById('transaction-list');
  list.innerHTML = '';
  transactions.forEach((tx, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${tx.date} - ${tx.description} - ${tx.category} - ₹${tx.amount} [${tx.type}]
      <button onclick="deleteTransaction(${index})">Delete</button>
    `;
    list.appendChild(li);
  });
  updateSummary();
}

function updateSummary() {
  let income = 0, expense = 0;
  transactions.forEach(tx => {
    tx.type === 'income' ? income += tx.amount : expense += tx.amount;
  });

  document.getElementById('total-income').textContent = income;
  document.getElementById('total-expense').textContent = expense;
  document.getElementById('net-income').textContent = income - expense;
}

function addTransaction() {
  const date = document.getElementById('date').value;
  const description = document.getElementById('description').value;
  const category = document.getElementById('category').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const type = document.getElementById('type').value;
  const errorDiv = document.getElementById('error-message');

  if (!date || !description || !category || isNaN(amount)) {
    errorDiv.textContent = "Please fill in all fields correctly.";
    errorDiv.style.color = "red";
    return;
  }

  errorDiv.textContent = "";

  const transaction = { date, description, category, amount, type };
  transactions.push(transaction);
  updateLocalStorage();
  displayTransactions();

  document.getElementById('date').value = '';
  document.getElementById('description').value = '';
  document.getElementById('category').value = '';
  document.getElementById('amount').value = '';
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  updateLocalStorage();
  displayTransactions();
}

window.onload = displayTransactions;
