document.addEventListener("DOMContentLoaded", loadExpenses);

function addExpense(event){
    event.preventDefault(); 
    const amount = parseFloat(document.getElementById('expenseamount').value);
    const description = document.getElementById('expensedescription').value;
    const category = document.getElementById('expensecategory').value;
    
    const expense = { amount, description, category };
    const expenses =JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push(expense);

    localStorage.setItem('expenses', JSON.stringify(expenses));

    document.getElementById('expenseamount').value= '';
    document.getElementById('expensedescription').value = '';

    loadExpenses();
}

function loadExpenses(){
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const expenseList = document.getElementById('expenselist');
    expenseList.innerHTML= ''; 
    expenses.forEach((expense, index) =>{
        const listItem = document.createElement('li');
        listItem.className ='expense-item';
        listItem.innerHTML = `
            <span>${expense.amount} - ${expense.description} - ${expense.category}</span>
            <div>
                <button onclick="editExpense(${index})">Edit</button>
                <button onclick="deleteExpense(${index})">Delete</button>
            </div>
        `;
        expenseList.appendChild(listItem);
    });
}

function deleteExpense(index){
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    if (index < 0 || index >=  expenses.length) {
        console.error("Invalid index:", index);
        return;
    }
    expenses.splice( index, 1) ;
    localStorage.setItem('expenses', JSON.stringify(expenses));
    loadExpenses();
}

function editExpense(index){
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    if (index < 0 || index >= expenses.length){
        console.error("Invalid index:", index) ;
        return;
    }
    const expense =expenses[index];
    document.getElementById('expenseamount').value =expense.amount;
    document.getElementById('expensedescription').value = expense.description;
    document.getElementById('expensecategory').value = expense.category;

    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    loadExpenses();
}
