
const form = document.getElementById('myExpense');
form.addEventListener('submit', function(event) {
    event.preventDefault(); 
    const amount = document.getElementById('amount').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    const userDetails = {
        amount,
        description,
        category
    };
    const userDet = JSON.stringify(userDetails);
    localStorage.setItem(userDetails.amount, userDet);
    show(userDetails);
    form.reset();
});

function show(userDetails) {
    const cre = document.getElementById("exList");
    const list = document.createElement("li");
    list.textContent = userDetails.amount+" "+userDetails.description+" "+userDetails.category;
    const del = document.createElement("button");
    del.className = "delete-btn";
    del.textContent = "Delete";
    del.onclick = () => {
        localStorage.removeItem(userDetails.amount); 
        cre.removeChild(list);
    }
    const edit = document.createElement("button");
    edit.className = "edit-btn";
    edit.textContent = "Edit";
    edit.onclick = () => {
        localStorage.removeItem(userDetails.amount); 
        cre.removeChild(list);
        document.getElementById("amount").value = userDetails.amount; 
        document.getElementById("description").value = userDetails.description; 
        document.getElementById("category").value = userDetails.category; 
    }
    list.appendChild(edit);
    list.appendChild(del);
    cre.appendChild(list);
}
function loadExpenses() {
    const cre = document.getElementById("exList");
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!isNaN(key)) {
            const userDetails = JSON.parse(localStorage.getItem(key));
            show(userDetails);
        }
    }
}
window.addEventListener('load', function() {
    loadExpenses();
});
