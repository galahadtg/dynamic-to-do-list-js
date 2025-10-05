// Ensure the script runs only after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a task
    function addTask() {
        const taskText = taskInput.value.trim(); // Get task text and remove extra spaces

        // If the input is empty, alert the user
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        // Create a new list item for the task
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create the remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = "remove-btn";

        // Remove task when button is clicked
        removeButton.onclick = () => {
            taskList.removeChild(listItem);
        };

        // Append the remove button to the list item
        listItem.appendChild(removeButton);

        // Add the new task to the task list
        taskList.appendChild(listItem);

        // Clear the input field
        taskInput.value = "";
    }

    // Add event listener for the "Add Task" button
    addButton.addEventListener('click', addTask);

    // Add task when user presses the Enter key
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
