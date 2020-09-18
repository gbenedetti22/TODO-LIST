const todoInput=document.querySelector('.todo-input');
const todoButton=document.querySelector('.todo-button');
const todoList=document.querySelector('.todo-list');

function addTodo(event) {
    event.preventDefault();
    const todoDiv=document.createElement('div');
    todoDiv.classList.add("todo");

    const newTodo = document.createElement('li');
    newTodo.innerText=todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

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

todoButton.addEventListener('click',addTodo);

