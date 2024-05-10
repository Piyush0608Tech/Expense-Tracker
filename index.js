const exp = document.querySelector("button[type='submit']");
const added = document.querySelector(".listul");
console.log("added");
exp.addEventListener("click", function(event){
    event.preventDefault();
    const amount = document.getElementById("amount").value;
    const desc = document.getElementById("Description").value;
    const cat = document.getElementById("Category").value;
    const list = document.createElement("li");
    list.textContent = `${amount} - ${desc} - ${cat}`;
    document.getElementById("amount").value="";
    document.getElementById("Description").value="";
    document.getElementById("Category").value="";
    const del = document.createElement("button");
    const deltext = document.createTextNode("Delete");
    del.appendChild(deltext);
    del.className="deletebtn";
    list.appendChild(del);
    const edit = document.createElement("button");
    const edittext = document.createTextNode("edit");
    edit.appendChild(edittext);
    edit.className="editbtn";
    list.appendChild(edit);
    added.appendChild(list);
})
added.addEventListener("click", function(event){
    if (event.target.classList.contains("deletebtn")){
        const dell = event.target.parentElement;
        added.removeChild(dell);
    }
    
})

