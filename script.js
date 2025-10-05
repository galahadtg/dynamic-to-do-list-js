// Ensure the script runs only after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // In-memory tasks array (loaded from localStorage)
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    // Save current tasks array to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Create a DOM element for a task and return it
    function createTaskElement(taskText) {
        const listItem = document.createElement('li');

        // Use a span for the task text so button doesn't mix with textContent
        const textSpan = document.createElement('span');
        textSpan.textContent = taskText;
        listItem.appendChild(textSpan);

        // Create the remove button and add required class
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn'); // use classList.add as required

        // When clicked, remove the list item and update localStorage
        removeButton.onclick = () => {
            // Remove from DOM
            taskList.removeChild(listItem);

            // Remove one matching item from tasks array (first match)
            const index = tasks.indexOf(taskText);
            if (index > -1) {
                tasks.splice(index, 1);
                saveTasks();
            }
        };

        listItem.appendChild(removeButton);
        return listItem;
    }

    /**
     * addTask - Adds a task to the DOM and optionally saves it to localStorage.
     * @param {string} [taskText] - If provided, this text will be used. Otherwise reads from input.
     * @param {boolean} [save=true] - Whether to save to localStorage (set false when loading existing tasks).
     */
    function addTask(taskText, save = true) {
        // If taskText was not provided, read from the input field
        if (typeof taskText === 'undefined') {
            taskText = taskInput.value.trim();
        } else {
            taskText = String(taskText).trim();
        }

        // Prevent empty tasks
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        // Create and append the task element to the list
        const listItem = createTaskElement(taskText);
        taskList.appendChild(listItem);

        // Save to tasks array and localStorage if requested
        if (save) {
            tasks.push(taskText);
            saveTasks();
        }

        // Clear the input field
        taskInput.value = "";
    }

    // Load tasks from localStorage and render them (do not re-save while loading)
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        // ensure in-memory array matches stored tasks
        tasks = storedTasks;
        storedTasks.forEach(taskText => {
            addTask(taskText, false); // false -> don't save again while loading
        });
    }

    // Initial load of tasks when the page loads
    loadTasks();

    // Attach event listeners
    addButton.addEventListener('click', () => addTask());
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
