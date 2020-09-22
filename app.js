const todoInput=document.querySelector('.todo-input');
const todoButton=document.querySelector('.todo-button');
const todoList=document.querySelector('.todo-list');
const filterOption=document.querySelector('.filter-todo');

function createTodo(saveLocal, todo){
    const todoDiv=document.createElement('div');
    todoDiv.classList.add("todo");

    const newTodo = document.createElement('li');
    newTodo.innerText=capitalize(todo);
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    if(saveLocal) {
        saveLocalTodo(todoInput.value);
    }
    //Aggiungere un Button per il completamento
    const completedButton = document.createElement("button");
    completedButton.innerHTML= "<i class='fas fa-check'></i>"
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //Aggiungere un Button per cancellare il Todo
    const trashButton = document.createElement("button");
    trashButton.innerHTML= "<i class='fas fa-trash'></i>"
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
    todoInput.value ="";
}

function addTodo(event) {
    event.preventDefault();

    if(todoInput.value === ""){
        alert("Hey devi inserire qualcosa da fare!");
        return;
    }
    createTodo(true, todoInput.value);
    console.log("ciao");
}
function deleteTodo(event) {
    const item=event.target;
    if(item.classList[0]==="trash-btn"){
        item.parentElement.classList.add("fall");
        item.parentElement.addEventListener("transitionend",function(){
            item.parentElement.remove();
        });
        deleteTodoFromStorage(item.parentElement);
    }

    if(item.classList[0]=== "complete-btn"){
        item.parentElement.classList.toggle("completed");
    }
}
function filterTodo(e){
    const todos=todoList.childNodes;
    todos.forEach(function(todo){
        switch (e.target.value) {
            case "all":
                todo.style.display="flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display="flex";
                }else{
                    todo.style.display="none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display="flex";
                }else{
                    todo.style.display="none";
                }
                break;
        }
    });
}

document.addEventListener('DOMContentLoaded', getTodos);
todoList.addEventListener("click", deleteTodo);
todoButton.addEventListener('click',addTodo);
filterOption.addEventListener('click',filterTodo);

function saveLocalTodo(todo) {
    let todos;
    if (localStorage.getItem('todos')=== null){
        todos=[];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}
function deleteTodoFromStorage(todo){
    let todos;
    if (localStorage.getItem('todos')=== null){
        todos=[];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoText = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoText),1);
    localStorage.setItem('todos',JSON.stringify(todos));
}
function getTodos(){
    let todos;
    if (localStorage.getItem('todos')=== null){
        todos=[];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        createTodo(false,todo);
    });
}
const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}