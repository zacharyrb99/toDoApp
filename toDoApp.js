const todoForm = document.querySelector('#todoForm');
const todoList = document.querySelector('#todoList');
let savedTodos = JSON.parse(localStorage.getItem('todos')) || [];

for(let i = 0; i < savedTodos.length; i++){
    let newTodo = document.createElement('li');
    newTodo.innerText = savedTodos[i].todo;
    newTodo.isCompleted = savedTodos[i].isCompleted ? true : false;
    if(newTodo.isCompleted){
        newTodo.classList.toggle = 'completed';
    }
    todoList.append(newTodo);
}

todoForm.addEventListener('submit', function(event){
    event.preventDefault();

    let newTodo = document.createElement('li');
    let input = document.querySelector('#todo');

    newTodo.innerText = input.value;
    newTodo.isCompleted = false;
    todoForm.reset();
    todoList.append(newTodo);

    savedTodos.push({todo: newTodo.innerText, isCompleted: false});
    localStorage.setItem('todos', JSON.stringify(savedTodos));
});

todoList.addEventListener('click', function(event){
    event.target.classList.toggle('completed');
    let click = event.target;

        if(!click.isCompleted){
        click.isCompleted = true;
    } else{
        click.isCompleted = false;
    }

    for(let i = 0; i < savedTodos.length; i++){
        if(savedTodos[i].todo === click.innerText){
            savedTodos[i].isCompleted = click.isCompleted;
            localStorage.setItem('todos', JSON.stringify(savedTodos));
        }
    }
});

todoList.addEventListener('dblclick', function(event){
    event.target.remove('LI');

    let todoDelete = event.target;
    savedTodos = savedTodos.filter(function(todos){
        return todos.todo !== todoDelete.innerText;
    });
    localStorage.setItem('todos', JSON.stringify(savedTodos))
})