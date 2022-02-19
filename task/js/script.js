// Default UI element
let form = document.querySelector('#task-form');
let tasklist = document.querySelector('ul');
let clearBtn = document.querySelector('#clear-task');
let filter = document.querySelector('#task-filter');
let taskInput = document.querySelector('#new-task');

// Define Event Listeners
form.addEventListener('submit', addTask);
tasklist.addEventListener('click', removeTask);
clearBtn.addEventListener('click', clearTask);

// Define Functions
// Add Task
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a Task');
    } else {
        // create li element
        let listItem = document.createElement('li');
        listItem.appendChild(document.createTextNode(taskInput.value + ' '));
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'x';
        listItem.appendChild(link);
        tasklist.appendChild(listItem);
        taskInput.value = '';
    }
    e.preventDefault();
}

// Remove Task
function removeTask(e) {
    if (e.target.hasAttribute('href')) {
        if (confirm('Are you sure?')) {
            let ele = e.target.parentElement;
            ele.remove();
        }
    }
}

// Clear Task
function clearTask(e) {
    // tasklist.innerHTML = '';

    // faster
    while (tasklist.firstChild) {
        tasklist.removeChild(tasklist.firstChild);
    }
}