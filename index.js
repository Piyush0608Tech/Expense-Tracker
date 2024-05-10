document.addEventListener("DOMContentLoaded", () => {
    const exp = document.querySelector("button[type='submit']");
    const added = document.querySelector(".listul");
    exp.addEventListener("click", (event) => {
        event.preventDefault();

        const amount = document.getElementById("amount").value;
        const desc = document.getElementById("Description").value;
        const cat = document.getElementById("Category").value;
        const uniqueId = `${desc}-${Date.now()}`
        const obj = {
            amount: parseFloat(amount), 
            description: desc,
            category: cat,
        }
        const listItem = createListItem(uniqueId, amount, desc, cat);
        added.appendChild(listItem);
        localStorage.setItem(uniqueId, JSON.stringify(obj));

        document.getElementById("amount").value = "";
        document.getElementById("Description").value = "";
        document.getElementById("Category").value = "";
    });

    const createListItem = (id, amount, desc, cat) => {
        const list = document.createElement("li");
        list.textContent = `${amount} - ${desc} - ${cat}`;
        list.id = id;
        const del = document.createElement("button");
        del.textContent = "Delete";
        del.className = "deletebtn";
        del.addEventListener("click", (event) => {
            const delli = event.target.parentElement;
            localStorage.removeItem(delli.id);
            added.removeChild(delli);
        });
        const edit = document.createElement("button");
        edit.textContent = "Edit";
        edit.className = "editbtn";
        edit.addEventListener("click", (event) => {
            const editli = event.target.parentElement;
            const itemData = JSON.parse(localStorage.getItem(editli.id));
            document.getElementById("amount").value = itemData.amount;
            document.getElementById("Description").value = itemData.desc;
            document.getElementById("Category").value = itemData.cat;
            localStorage.removeItem(editli.id);
            added.removeChild(editli);
        });
        list.appendChild(del);
        list.appendChild(edit);
        return list;
    };

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const item = JSON.parse(localStorage.getItem(key));
        const listItem = createListItem(key, item.amount, item.desc, item.cat);
        added.appendChild(listItem);
    }
   
});
