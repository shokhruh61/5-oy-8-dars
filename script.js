document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => addTaskToDOM(task));
    }


    function saveTasks(tasks) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }


    function addTaskToDOM(task) {
        const taskItem = document.createElement("li");

        const taskSpan = document.createElement("span");
        taskSpan.textContent = task;
        taskSpan.classList.add("task-text");


        const editBtn = document.createElement("button");
        editBtn.textContent = "✏️";
        editBtn.classList.add(('clear'), "edit-btn");

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "🗑️";


        taskItem.appendChild(taskSpan);
        taskItem.appendChild(editBtn);
        taskItem.appendChild(deleteBtn);
        taskList.appendChild(taskItem);
    }


    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === "") return;

        addTaskToDOM(taskText);

        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(taskText);
        saveTasks(tasks);

        taskInput.value = "";
    }


    function editTask(taskSpan) {
        const newTask = prompt("Edit your task:", taskSpan.textContent);
        if (newTask === null || newTask.trim() === "") return;

        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const taskIndex = tasks.indexOf(taskSpan.textContent);

        if (taskIndex > -1) {
            tasks[taskIndex] = newTask;
            saveTasks(tasks);
            taskSpan.textContent = newTask;
        }
    }

    function deleteTask(taskItem, taskText) {
        taskList.removeChild(taskItem);

        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const updatedTasks = tasks.filter(task => task !== taskText);
        saveTasks(updatedTasks);
    }

    addTaskBtn.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") addTask();
    });


    loadTasks();
});
