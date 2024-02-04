const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');

// Load saved to-do items from local storage when the page is loaded
document.addEventListener('DOMContentLoaded', function() {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    savedTodos.forEach(addTodoToList);
});

// Event listener for adding a new to-do item
document.getElementById('addTodo').addEventListener('click', function() {
    const todoText = todoInput.value.trim();
    if (todoText !== '') {
        addTodoToList(todoText);
        todoInput.value = '';
        saveToLocalStorage();
    }
});

// Function to add a new to-do item to the list
function addTodoToList(todoText) {
    const listItem = document.createElement('li');
    listItem.textContent = todoText;

    // Create a checkbox for marking completeness
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', function() {
        listItem.classList.toggle('completed');
        saveToLocalStorage();
    });

    // Create a delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
        listItem.remove();
        saveToLocalStorage();
    });

    listItem.appendChild(checkbox);
    listItem.appendChild(deleteButton);
    todoList.appendChild(listItem);
}

// Function to save the current to-do list to local storage
function saveToLocalStorage() {
    const todos = Array.from(todoList.children).map(function(listItem) {
        return {
            text: listItem.textContent,
            completed: listItem.classList.contains('completed')
        };
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}
