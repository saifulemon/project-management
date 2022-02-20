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
filter.addEventListener('keyup', filterTask);
document.addEventListener('DOMContentLoaded', getTasks)

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

        storeTaskinLocalStorage(taskInput.value);

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

            removeFromLS(ele);
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
    localStorage.clear();
}

// Filter Task
function filterTask(e) {
    let text = e.target.value.toLowerCase();

    document.querySelectorAll('li').forEach(task => {
        let item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}

// Store in local Storage
function storeTaskinLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(task => {
        let listItem = document.createElement('li');
        listItem.appendChild(document.createTextNode(task + ' '));
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'x';
        listItem.appendChild(link);
        tasklist.appendChild(listItem);
    })
}


function removeFromLS(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    // let str = taskItem.textContent.trim;
    let li = taskItem;
    li.removeChild(li.lastChild);

    tasks.forEach((task, index) => {
        if (li.textContent.trim() === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}