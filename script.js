const inputbox = document.getElementById('inputbox');
const addbtn = document.getElementById('addbtn');
const todolist = document.getElementById('todolist');

let editTodo = null;
   
// function to add to do 
const addTodo = () => {
    const inputText = inputbox.value.trim();
      
    if (inputText.length <= 0){
        alert("please enter a task");
        return false;
    }

    if(addbtn.value === "Edit"){
        editTodo.target.parentElement.children[0].textContent = inputText;
        editlocaltodo(inputText);
        addbtn.value = "Add";
        inputbox.value = "";
        
    }
    else{
      //creating p tag
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.textContent = inputText;
    li.appendChild(p);
      
    //creating a edit button 
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("btn","editBtn");
    li.appendChild(editBtn); 
       
    //creating delete button 
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Remove";
    deleteBtn.classList.add("btn","deleteBtn");
    li.appendChild(deleteBtn);

    todolist.appendChild(li);
     inputbox.value = "";

     savelocaltodos(inputText);
  }
};

//function to edit and delete todo
const updatetodo = (e) =>{
    
    if(e.target.textContent === "Remove"){
        todolist.removeChild(e.target.parentElement);
       deletelocaltodos(e.target.parentElement);
    }
    
    if(e.target.textContent === "Edit"){
        inputbox.value = e.target.parentElement.children[0].textContent;
        inputbox.focus();
        addbtn.value = "Edit";
        editTodo = e;
    }
};
//functin to save todo to local storage 
const savelocaltodos = (todo) => {
   
    let todos = [];
    if(localStorage.getItem("todos") === null){
       todos = [];
   }
     else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
     todos.push(todo);
     localStorage.setItem("todos", JSON.stringify(todos));
};

//function to get todos from local storage
const getlocaltodos = () => {
    
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach(todo => {
           
            //creating p tag
            const li = document.createElement("li");
            const p = document.createElement("p");
            p.textContent = todo;
            li.appendChild(p);
      
             //creating a edit button 
             const editBtn = document.createElement("button");
             editBtn.textContent = "Edit";
             editBtn.classList.add("btn","editBtn");
            editBtn.classList.add("btn");
             li.appendChild(editBtn); 
       
             //creating delete button 
              const deleteBtn = document.createElement("button");
             deleteBtn.textContent = "Remove";
            deleteBtn.classList.add("btn");
             deleteBtn.classList.add("btn","deleteBtn");
              li.appendChild(deleteBtn);

             todolist.appendChild(li);
        });
    }
}

//function to delete todo from local storage 
const deletelocaltodos = (todo) =>{
   
   let todos = [];
        if(localStorage.getItem("todos") === null){
             todos = [];
     }
        else{
            todos = JSON.parse(localStorage.getItem("todos"));
    }

        let todoText = todo.children[0].textContent;
        let todoindex = todos.indexOf(todoText);
        todos.splice(todoindex, 1);
        localStorage.setItem("todos", JSON.stringify(todos));
        console.log(todoText);
}
const editlocaltodo = (todo) =>{
  
      let todos = JSON.parse(localStorage.getItem("todos"));
      let todoIndex = todos.indexOf(todo);
       todos[todoIndex] = inputbox.value;
       localStorage.setItem("todos", JSON.stringify(todos));
}

document.addEventListener("DOMContentLoaded", getlocaltodos);
addbtn.addEventListener('click', addTodo);
todolist.addEventListener('click', updatetodo);