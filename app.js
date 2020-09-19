const todoInput=document.querySelector('.todo-input');
const todoButton=document.querySelector('.todo-button');
const todoList=document.querySelector('.todo-list');
const filterOption=document.querySelector('.filter-todo');

function addTodo(event) {
    event.preventDefault();

    if(todoInput.value === ""){
        alert("Hey devi inserire qualcosa da fare!");
        return;
    }
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
function deleteTodo(event) {
    const item=event.target;
    if(item.classList[0]==="trash-btn"){
        item.parentElement.classList.add("fall");
        item.parentElement.addEventListener("transitionend",function(){
            item.parentElement.remove();
        });
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

todoList.addEventListener("click", deleteTodo);
todoButton.addEventListener('click',addTodo);
filterOption.addEventListener('click',filterTodo);

