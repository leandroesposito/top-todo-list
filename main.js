/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// ./src/HtmlCreators/utils.js
function createElement(tagName, ...classList) {
    const element = document.createElement(tagName);

    for (const className of classList) {
        element.classList.add(className);
    }

    return element;
}

function createFormRow() {
    return createElement("div", "form-row");
}

function createMainTitle(text) {
    const titleDiv = createElement("div", "main-title");
    const icon = createElement("div", "title-icon", "icon");
    const textNode = document.createTextNode(text);
    titleDiv.appendChild(icon);
    titleDiv.appendChild(textNode);

    return titleDiv;
}

function createLabelInput(data) {
    const label = document.createElement("label");
    for (const className of data.labelClassList) {
        label.classList.add(className);
    }
    label.for = data.id;
    label.textContent = data.label;

    let input;
    if (data.type === "textarea") {
        input = document.createElement("textarea");
        input.rows = 2;
    }
    else {
        input = document.createElement("input");
        input.type = data.type;
    }
    input.id = data.id;
    input.name = data.id;

    return [label, input];
}

function createAddButton(text, ...classList) {
    const button = createElement("button", ...classList, "add-button");
    const plusIcon = createElement("span", "plus-icon", "icon");
    plusIcon.textContent = "+";

    const textNode = document.createTextNode(text);

    button.appendChild(plusIcon);
    button.appendChild(textNode);

    return button;
}
;// ./src/HtmlCreators/newProjectForm.js


function createNewProjectForm() {
    const form = createElement("form", "content");

    const projectTitleDiv = createMainTitle("New Project");
    form.appendChild(projectTitleDiv);

    const titleRow = createFormRow();
    const [titleLabel, titleInput] = createLabelInput({
        label: "Project title",
        id: "project-title",
        labelClassList: ["section-title"],
        type: "text",
    });
    titleRow.appendChild(titleLabel);
    titleRow.appendChild(titleInput);
    form.appendChild(titleRow);

    const descriptionRow = createFormRow();
    const [descriptionLabel, descriptionInput] = createLabelInput({
        label: "Project description",
        id: "project-description",
        labelClassList: ["section-title"],
        type: "textarea",
    });
    descriptionRow.appendChild(descriptionLabel);
    descriptionRow.appendChild(descriptionInput);
    form.appendChild(descriptionRow);

    const buttonContainer = createElement("div", "buttons");
    const createButton = createAddButton("Create Project", "create-project");
    buttonContainer.appendChild(createButton);
    form.appendChild(buttonContainer);

    return form;
}

function createEditProjectForm(project) {
    const form = createNewProjectForm();

    form.querySelector("#project-title").value = project.title;
    form.querySelector("#project-description").value = project.description;

    const saveButton = form.querySelector(".create-project");
    saveButton.textContent = "Save Project";
    saveButton.classList.add("save-project");

    return form;
}
;// ./src/HtmlCreators/newTaskForm.js


function createSubtaskDiv() {
    const subtask = createElement("div", "subtask");

    const input = document.createElement("input");
    input.type = "text";
    input.id = "subtask-description";
    input.name = "subtask-description[]";

    subtask.appendChild(input);
    const deleteIcon = createElement("div", "delete-subtask", "x-icon", "icon", "red-icon");
    deleteIcon.addEventListener("click", () => subtask.remove());
    subtask.appendChild(deleteIcon);

    return subtask;
}

function addSubtaskInput() {
    const subtasksContainer = document.querySelector(".form-row.subtasks");
    const input = createSubtaskDiv();
    subtasksContainer.appendChild(input);
}

function fixISODate(date) {
    const MILLISECONDS_PER_MINUTE = 60 * 1000;
    const TIMEZONE_OFFSET_MILLISECONDS = new Date().getTimezoneOffset() * MILLISECONDS_PER_MINUTE;
    return new Date(date.getTime() - TIMEZONE_OFFSET_MILLISECONDS);
}

function getFixedIsoDateString(date) {
    return fixISODate(date)
        .toISOString()
        .replace("Z", "")
        .slice(0, -7);
}

function createNewTaskForm() {
    const form = createElement("form", "content");

    const projectTitleDiv = createMainTitle("New Task");
    form.appendChild(projectTitleDiv);

    const titleRow = createFormRow();
    const [titleLabel, titleInput] = createLabelInput({
        label: "Task title",
        id: "task-title",
        labelClassList: ["section-title"],
        type: "text",
    });
    titleRow.appendChild(titleLabel);
    titleRow.appendChild(titleInput);
    form.appendChild(titleRow);

    const descriptionRow = createFormRow();
    const [descriptionLabel, descriptionInput] = createLabelInput({
        label: "Task description",
        id: "task-description",
        labelClassList: ["section-title"],
        type: "textarea",
    });
    descriptionRow.appendChild(descriptionLabel);
    descriptionRow.appendChild(descriptionInput);
    form.appendChild(descriptionRow);

    const dueDateRow = createFormRow();
    const [dueDateLabel, dueDateInput] = createLabelInput({
        label: "Due Date",
        id: "task-due-date",
        labelClassList: ["section-title"],
        type: "datetime-local",
    });
    dueDateInput.value = getFixedIsoDateString(new Date());
    dueDateRow.appendChild(dueDateLabel);
    dueDateRow.appendChild(dueDateInput);
    form.appendChild(dueDateRow);

    const priorityRow = createFormRow();
    const [priorityLabel, priorityInput] = createLabelInput({
        label: "Priority",
        id: "task-priority",
        labelClassList: ["section-title"],
        type: "number",
    });

    priorityInput.min = 0;
    priorityInput.max = 5;
    const priorityMinMaxIndicator = createElement("div");
    priorityMinMaxIndicator.textContent = "(minimum: 0 | maximum: 5)";
    priorityLabel.appendChild(priorityMinMaxIndicator);

    priorityRow.appendChild(priorityLabel);
    priorityRow.appendChild(priorityInput);
    form.appendChild(priorityRow);

    const notesRow = createFormRow();
    const [notesLabel, notesInput] = createLabelInput({
        label: "Notes",
        id: "task-notes",
        labelClassList: ["section-title"],
        type: "textarea",
    });
    notesInput.rows = 10;
    notesRow.appendChild(notesLabel);
    notesRow.appendChild(notesInput);
    form.appendChild(notesRow);

    const subtasksRow = createFormRow();
    subtasksRow.classList.add("subtasks");
    const [subtasksLabel, subtasksInput] = createLabelInput({
        label: "Subtasks",
        id: "subtask-description",
        labelClassList: ["section-title"],
        type: "text",
    });
    subtasksInput.name = "subtask-description[]";

    const subtaskEmptyIndicator = createElement("div");
    subtaskEmptyIndicator.textContent = "(empty subtasks will be ignored)";
    subtasksLabel.appendChild(subtaskEmptyIndicator);
    subtasksRow.appendChild(subtasksLabel);

    const subtask = createElement("div", "subtask");
    subtask.appendChild(subtasksInput);
    const deleteIcon = createElement("div", "delete-subtask", "x-icon", "icon", "red-icon");
    deleteIcon.addEventListener("click", () => subtask.remove());
    subtask.appendChild(deleteIcon);

    subtasksRow.appendChild(subtask);

    form.appendChild(subtasksRow);

    const buttonContainer = createElement("div", "button-container");
    const createSubtaskButton = createAddButton("Create Subtask", "create-subtask");
    createSubtaskButton.type = "button";
    createSubtaskButton.addEventListener("click", addSubtaskInput);
    buttonContainer.appendChild(createSubtaskButton);



    const createTaskButton = createAddButton("Create Task", "create-task");
    buttonContainer.appendChild(createTaskButton);
    form.appendChild(buttonContainer);

    return form;
}

function createEditTaskForm(task) {
    form = createNewTaskForm();

    form.querySelector("#task-title").value = task.title;
    form.querySelector("#task-description").value = task.description;

    form.querySelector("#task-due-date").value = getFixedIsoDateString(task.dueDate);

    form.querySelector("#task-priority").value = task.priority;
    form.querySelector("#task-notes").value = task.notes;

    form.querySelector(".subtasks").innerHTML = "";
    task.subtasks.forEach((subtask) => {
        const subtaskDiv = createSubtaskDiv();
        const subtaskInput = subtaskDiv.querySelector("input");
        subtaskInput.value = subtask.description;
        form.querySelector(".subtasks").appendChild(subtaskDiv);
    });

    const saveButton = form.querySelector(".create-task");
    saveButton.innerHTML = "";
    const saveIcon = createElement("div", "save-icon", "icon");
    saveButton.appendChild(saveIcon);
    const textNode = document.createTextNode("Save Task");
    saveButton.appendChild(textNode);
    saveButton.classList.add("save-task");

    return form;
}
;// ./src/HtmlCreators/projectViewer.js


function createSubtask(subtask) {
    const subtaskDiv = createElement("div", "subtask");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = subtask.completed;
    subtaskDiv.appendChild(input);
    const subtaskDescriptionDiv = createElement("div", "subtask-description");
    subtaskDescriptionDiv.textContent = subtask.description;
    subtaskDiv.appendChild(subtaskDescriptionDiv);

    return subtaskDiv;
}

function createTask(task, taskIndex) {
    const taskContainer = createElement("div", "task");
    const titleDiv = createElement("div", "section-title");
    const textNode = document.createTextNode(task.title);
    const editIcon = createElement("div", "edit-task", "pencil-icon", "icon");
    const deleteIcon = createElement("div", "delete-task", "x-icon", "red-icon", "icon");
    const completeIcon = createElement("div", "complete-task", "check-icon", "green-icon", "icon");
    if (task.completed) {
        completeIcon.classList.add("grey-icon");
    }
    titleDiv.appendChild(textNode);
    titleDiv.appendChild(editIcon);
    titleDiv.appendChild(deleteIcon);
    titleDiv.appendChild(completeIcon);
    taskContainer.appendChild(titleDiv);

    const detailsDiv = createElement("div", "task-status-details");
    const priorityDiv = createElement("div", "task-priority");
    priorityDiv.setAttribute("data-priority", task.priority);
    detailsDiv.appendChild(priorityDiv);

    const completeStatusDiv = createElement("div", "task-complete-status");
    completeStatusDiv.setAttribute("data-complete-status", task.completed ? "completed" : "pending");
    detailsDiv.appendChild(completeStatusDiv);

    const dueDateDiv = createElement("div", "task-due-date");
    const remainingTime = task.remainingTime;
    dueDateDiv.textContent = `⏳ ${remainingTime.isNegative ? "-" : ""} ${remainingTime.days} days ${remainingTime.hours} hours ${remainingTime.minutes} minutes remaining`;
    detailsDiv.appendChild(dueDateDiv);
    taskContainer.appendChild(detailsDiv);

    const descriptionDiv = createElement("div", "task-description");
    descriptionDiv.textContent = task.description;
    taskContainer.appendChild(descriptionDiv);

    const subtasksDiv = createElement("div", "task-subtasks");
    task.subtasks.forEach((subtask, subTaskIndex) => {
        const subtaskDiv = createSubtask(subtask);
        subtaskDiv.dataset.subtaskIndex = subTaskIndex;
        subtaskDiv.dataset.taskIndex = taskIndex;
        subtasksDiv.appendChild(subtaskDiv);
    });
    taskContainer.appendChild(subtasksDiv);

    const notesTitle = createElement("div", "section-title");
    notesTitle.textContent = "Notes";
    const notesDiv = createElement("div", "task-notes");
    const notesContent = createElement("pre");
    notesContent.textContent = task.notes;
    notesDiv.appendChild(notesContent);
    taskContainer.appendChild(notesDiv);

    return taskContainer;
}


function createProjectViewer(project) {
    const content = createElement("div", "content");
    if (!project) {
        const noProjectDiv = createElement("div", "no-project-selected");
        const textNode = document.createTextNode("No project selected. Click on a project to view it here or click on the 'Create Project' button to create a new project.");
        noProjectDiv.appendChild(textNode);
        content.appendChild(noProjectDiv);
        return content;
    }

    const projectTitleDiv = createMainTitle(project.title);
    const editIcon = createElement("div", "edit-project", "pencil-icon", "icon");
    const deleteIcon = createElement("div", "delete-project", "x-icon", "red-icon", "icon");
    projectTitleDiv.appendChild(editIcon);
    projectTitleDiv.appendChild(deleteIcon);
    content.appendChild(projectTitleDiv);

    const projectDescriptionDiv = createElement("div", "project-description");
    projectDescriptionDiv.textContent = project.description;
    content.appendChild(projectDescriptionDiv);

    const tasksContainer = createElement("div", "tasks");
    project.tasks.forEach((task, index) => {
        tasksContainer.appendChild(createTask(task, index));
    });

    if (project.tasks.length === 0) {
        const noTasksDiv = createElement("div", "no-tasks");
        const textNode = document.createTextNode("No tasks found. Click on the 'Create Task' button to create a new task.");
        noTasksDiv.appendChild(textNode);
        tasksContainer.appendChild(noTasksDiv);
    }
    content.appendChild(tasksContainer);

    const buttonDiv = createElement("div", "buttons");
    const createButton = createAddButton("Create Task", "create-task");
    buttonDiv.appendChild(createButton);
    content.appendChild(buttonDiv);

    return content;
}
;// ./src/Subtask.js
class Subtask {
    #completed = false;

    constructor(description, completed) {
        this.description = description;
        this.#completed = Boolean(completed);
    }

    setCompleteStatus(status) {
        this.#completed = Boolean(status);
    }

    get completed() {
        return this.#completed;
    }

    toJSON() {
        return {
            description: this.description,
            completed: this.#completed
        }
    }
}
;// ./src/Task.js


class Task {
    #subtasks = [];

    constructor(title, description, dueDate, priority, completed, notes) {
        this.title = title ?? "";
        this.description = description ?? "";
        this._dueDate = new Date(dueDate);
        this._priority = Task.validatePriority(priority);
        this.completed = Boolean(completed);
        this.notes = notes ?? "";
    }


    get priority() {
        return this._priority;
    }

    set priority(value) {
        this._priority = Task.validatePriority(value);
    }

    get dueDate() {
        return this._dueDate;
    }

    set dueDate(value) {
        this._dueDate = new Date(value);
    }

    get subtasks() {
        return [...this.#subtasks];
    }

    get remainingTime() {
        const currentTime = new Date().getTime();
        const isNegative = this._dueDate.getTime() < currentTime;
        const difference = Math.abs(this._dueDate.getTime() - currentTime);

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)));
        const minutes = Math.floor((difference % (1000 * 60 * 60) / (1000 * 60)));
        const seconds = Math.floor((difference % (1000 * 60) / (1000)));

        return {
            isNegative,
            days,
            hours,
            minutes,
            seconds
        }
    }

    static validatePriority(value) {
        const parsedValue = parseInt(value);
        if (isNaN(parsedValue) || parsedValue < 0) {
            return 0;
        }
        return parsedValue;
    }

    completeTodo() {
        this.completed = true;

        for (let subtask of this.#subtasks) {
            subtask.setCompleteStatus(true);
        }
    }

    clearTodoCompletion() {
        this.completed = false;
    }

    completeSubtask(index) {
        if (this.#subtasks[index]) {
            this.#subtasks[index].setCompleteStatus(true);
        }
    }

    clearSubtaskCompletion(index) {
        if (this.#subtasks[index]) {
            this.#subtasks[index].setCompleteStatus(false);
        }
    }

    addSubtask(description) {
        if (!description) {
            return;
        }

        this.#subtasks.push(new Subtask(description));
    }

    removeSubtask(index) {
        this.#subtasks.splice(index, 1);
    }

    static fromJSON(json) {
        const data = typeof json === "string" ? JSON.parse(json) : json;

        const task = new Task(
            data.title,
            data.description,
            data.dueDate,
            data.priority,
            data.completed,
            data.notes
        );

        for (let i = 0; i < data.subtasks.length; i++) {
            const subtask = data.subtasks[i];
            task.addSubtask(subtask.description);
            if (subtask.completed) {
                task.completeSubtask(i);
            }
        }

        return task;
    }

    toJSON() {
        return {
            title: this.title,
            description: this.description,
            dueDate: this._dueDate,
            priority: this._priority,
            completed: this.completed,
            notes: this.notes,
            subtasks: this.#subtasks
        }
    }
}
;// ./src/Project.js


class Project {
    #tasks = [];

    constructor(title, description, id) {
        this.id = id ?? Date.now().toString(36);
        this.title = title;
        this.description = description;
    }

    addTask(task) {
        this.#tasks.push(task);
    }

    replaceTask(index, task) {
        this.#tasks.splice(index, 1, task);
    }

    removeTask(index) {
        this.#tasks.splice(index, 1);
    }

    removeSubtask(taskIndex, subtaskIndex) {
        this.#tasks[taskIndex].removeSubtask(subtaskIndex);
    }

    get tasks() {
        return [...this.#tasks];
    }

    toJSON() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            tasks: this.#tasks
        }
    }

    static fromJSON(json) {
        const data = typeof json === "string" ? JSON.parse(json) : json;

        const project = new Project(data.title, data.description, data.id);

        for (let i = 0; i < data.tasks.length; i++) {
            const task = data.tasks[i];
            project.addTask(Task.fromJSON(task));
        }

        return project;
    }
}
;// ./src/ProjectsDatabaseManager.js


class ProjectsDatabaseManager {
    /**
     * LocalStorage structure
     * key        | value
     * ------------------------------------------------------
     * username   | [idProject1, idProject2, ..., idProjectN]
     *            |
     * idProject1 | {project}
     * idProjectN | {project}
     */

    static saveProject(user, project) {
        const userProjects = JSON.parse(localStorage.getItem(user)) ?? [];
        if (!userProjects.includes(project.id)) {
            userProjects.push(project.id);
        }
        localStorage.setItem(user, JSON.stringify(userProjects));

        localStorage.setItem(project.id, JSON.stringify(project));
    }

    static loadProject(id) {
        return Project.fromJSON(localStorage.getItem(id));
    }

    static removeProject(user, projectId) {
        const userProjects = JSON.parse(localStorage.getItem(user)) ?? [];
        const index = userProjects.indexOf(projectId);
        if (index !== -1) {
            userProjects.splice(index, 1);
            localStorage.setItem(user, JSON.stringify(userProjects));
            localStorage.removeItem(projectId);
        }
    }

    static getUserProjects(user) {
        const userProjects = JSON.parse(localStorage.getItem(user)) ?? [];
        const projects = [];

        for (const projectId of userProjects) {
            projects.push(ProjectsDatabaseManager.loadProject(projectId));
        }

        return projects;
    }
}
;// ./src/ProjectsManager.js


class ProjectsManager {
    constructor(user) {
        this.user = user;
        this.projects = ProjectsDatabaseManager.getUserProjects(user);
        this.currenProject = this.projects[0] ?? null;
    }

    addProject(project) {
        this.projects.push(project);
        this.currenProject = project;
        this.saveProject(project);
    }

    saveProject(project) {
        if (!project) {
            project = this.currenProject;
        };
        ProjectsDatabaseManager.saveProject(this.user, project)
    }

    addTask(task) {
        this.currenProject.addTask(task);
        this.saveProject(this.currenProject);
    }

    addSubtask(taskIndex, subtask) {
        const task = this.currenProject.tasks[taskIndex];
        task.addSubtask(subtask);
        this.saveProject(this.currenProject);
    }

    removeTask(taskIndex) {
        this.currenProject.removeTask(taskIndex);
        this.saveProject(this.currenProject);
    }

    replaceTask(taskIndex, task) {
        this.currenProject.replaceTask(taskIndex, task);
        this.saveProject(this.currenProject);
    }

    setCurrentProject(projectIndex) {
        this.currenProject = this.projects[projectIndex];

        return this.currenProject;
    }

    setSubtaskStatus(taskIndex, subtaskIndex, status) {
        if (status) {
            this.currenProject.tasks[taskIndex].completeSubtask(subtaskIndex);
        }
        else {
            this.currenProject.tasks[taskIndex].clearSubtaskCompletion(subtaskIndex);
        }
        this.saveProject(this.currenProject);
    }

    removeProject(projectId) {
        this.projects = this.projects.filter((project) => project.id !== projectId);
        this.currenProject = this.projects[0] ?? null;
        ProjectsDatabaseManager.removeProject(this.user, projectId);
    }

    allSubtaskCompleted(taskIndex) {
        return this.currenProject.tasks[taskIndex].subtasks.every((subtask) => subtask.completed);
    }
}
;// ./src/index.js








const loadContent = (function () {
    function listMyProjects() {
        const myProjectsContainer = document.querySelector(".my-projects-container");
        myProjectsContainer.innerHTML = "";

        projectManager.projects.forEach((project, index) => {
            const projectButton = document.createElement("button");
            projectButton.classList.add("project-title");

            const icon = document.createElement("span");
            icon.classList.add("folder-icon", "icon");
            projectButton.appendChild(icon);

            const textNode = document.createTextNode(project.title);
            projectButton.appendChild(textNode);

            projectButton.addEventListener("click", () => { viewProject(index) });

            myProjectsContainer.appendChild(projectButton);
        });
    }

    function viewProject(projectIndex) {
        if (projectIndex !== undefined) {
            projectManager.setCurrentProject(projectIndex);
        }

        setContent(createProjectViewer, projectManager.currenProject);

        if (!projectManager.currenProject) {
            return;
        }

        const createTaskButton = document.querySelector(".create-task");
        createTaskButton.addEventListener("click", loadTaskCreation);

        const editProjectButton = document.querySelector(".edit-project");
        editProjectButton.addEventListener("click", loadProjectEdition);

        const deleteProjectButton = document.querySelector(".delete-project");
        deleteProjectButton.addEventListener("click", handleDeleteProject);

        const editTasksButtons = document.querySelectorAll(".edit-task");
        editTasksButtons.forEach((button, index) =>
            button.addEventListener("click", () => loadTaskEdition(index))
        );

        const deleteTasksButtons = document.querySelectorAll(".delete-task");
        deleteTasksButtons.forEach((button, index) =>
            button.addEventListener("click", () => handleDeleteTask(index))
        );

        const completeTasksButtons = document.querySelectorAll(".complete-task");
        completeTasksButtons.forEach((button, index) =>
            button.addEventListener("click", () => handleCompleteTask(index))
        );

        const subtasksContainer = document.querySelector(".task-subtasks");
        subtasksContainer.addEventListener("click", handleSubtaskCheckClick);
    }

    function handleCompleteTask(taskIndex) {
        const task = projectManager.currenProject.tasks[taskIndex];
        if (task.completed) {
            task.clearTodoCompletion();
        }
        else {
            task.completeTodo();
        }
        projectManager.saveProject(projectManager.currenProject);
        viewCurrentProject();
    }

    function handleSubtaskCheckClick(event) {
        const target = event.target;
        if (target.classList.contains("task-subtasks")) {
            return;
        }

        const subtask = target.closest(".subtask");
        const subtaskCheckbox = subtask.querySelector("input");
        subtaskCheckbox.checked = !subtaskCheckbox.checked;
        const taskIndex = subtask.dataset.taskIndex;
        const subtaskIndex = subtask.dataset.subtaskIndex;
        projectManager.setSubtaskStatus(taskIndex, subtaskIndex, subtaskCheckbox.checked);

        checkAllSubtasksCompleted(taskIndex);
    }

    function checkAllSubtasksCompleted(taskIndex) {
        if (projectManager.allSubtaskCompleted(taskIndex)) {
            const response = confirm("All subtasks are completed, do you want to complete the task?");
            if (!response) {
                return;
            }

            const task = projectManager.currenProject.tasks[taskIndex];
            task.completeTodo();
            projectManager.saveProject(projectManager.currenProject);
            viewCurrentProject();
        }
    }

    function handleDeleteTask(taskIndex) {
        const response = confirm("Are you sure you want to DELETE this task?");
        if (!response) {
            return;
        }

        projectManager.removeTask(taskIndex);
        viewCurrentProject();
    }

    function handleDeleteProject() {
        const response = confirm("Are you sure you want to DELETE this project?");
        if (!response) {
            return;
        }

        projectManager.removeProject(projectManager.currenProject.id);
        listMyProjects();
        viewProject(0);
    }

    function viewCurrentProject() {
        viewProject();
    }

    function loadTaskCreation() {
        setContent(createNewTaskForm);

        const createTaskButton = document.querySelector("form .create-task");
        createTaskButton.addEventListener("click", handleCreateTaskForm);
    }

    function handleCreateTaskForm(event) {
        event.preventDefault();

        const form = document.querySelector("form");
        const formData = new FormData(form);

        const taskTitle = formData.get("task-title");
        const taskDescription = formData.get("task-description");
        const taskPriority = formData.get("task-priority");
        const taskDueDate = formData.get("task-due-date");
        const taskNotes = formData.get("task-notes");

        const task = new Task(taskTitle, taskDescription, taskDueDate, taskPriority, false, taskNotes);

        const taskSubtasks = formData.getAll("subtask-description[]");

        taskSubtasks.forEach((subtask) => {
            task.addSubtask(subtask);
        });

        projectManager.addTask(task);

        viewCurrentProject();
    }

    function loadTaskEdition(taskIndex) {
        setContent(createEditTaskForm, projectManager.currenProject.tasks[taskIndex]);

        const saveTaskButton = document.querySelector("form .save-task");
        saveTaskButton.addEventListener("click", handleEditTaskForm);
        saveTaskButton.dataset.taskIndex = taskIndex;
    }

    function handleEditTaskForm(event) {
        event.preventDefault();

        const form = document.querySelector("form");
        const formData = new FormData(form);

        const taskTitle = formData.get("task-title");
        const taskDescription = formData.get("task-description");
        const taskPriority = formData.get("task-priority");
        const taskDueDate = formData.get("task-due-date");
        const taskNotes = formData.get("task-notes");

        const task = new Task(taskTitle, taskDescription, taskDueDate, taskPriority, false, taskNotes);

        const taskSubtasks = formData.getAll("subtask-description[]");

        taskSubtasks.forEach((subtask) => {
            task.addSubtask(subtask);
        });

        const saveTaskButton = document.querySelector("form .save-task");
        const taskIndex = saveTaskButton.dataset.taskIndex;

        projectManager.replaceTask(taskIndex, task);

        viewCurrentProject();
    }

    function loadProjectEdition() {
        setContent(createEditProjectForm, projectManager.currenProject);

        const saveProjectButton = document.querySelector("form .save-project");
        saveProjectButton.addEventListener("click", handleSaveProjectForm);
    }

    function handleSaveProjectForm(event) {
        event.preventDefault();

        const form = document.querySelector("form");
        const formData = new FormData(form);

        const projectTitle = formData.get("project-title");
        const projectDescription = formData.get("project-description");

        projectManager.currenProject.title = projectTitle;
        projectManager.currenProject.description = projectDescription;

        projectManager.saveProject();

        viewCurrentProject();
        listMyProjects();
    }

    function setContent(creatorFunction, params) {
        mainContainer.innerHTML = "";
        mainContainer.appendChild(creatorFunction(params));
    }

    function handleCreateProjectForm(event) {
        event.preventDefault();

        const form = document.querySelector("form");
        const formData = new FormData(form);

        const projectTitle = formData.get("project-title");
        const projectDescription = formData.get("project-description");

        const project = new Project(projectTitle, projectDescription);
        projectManager.addProject(project);

        listMyProjects();
        viewCurrentProject();
    }

    function loadProjectCreation() {
        setContent(createNewProjectForm);

        const createProjectButton = document.querySelector("form .create-project");
        createProjectButton.addEventListener("click", handleCreateProjectForm);
    }

    const userName = "User 1";
    const userNameContainer = document.querySelector(".user-name");
    userNameContainer.textContent = userName;

    const mainContainer = document.querySelector(".main-container");

    const projectManager = new ProjectsManager(userName);
    listMyProjects();
    viewCurrentProject();

    const createProjectButton = document.querySelector(".sidebar .create-project");
    createProjectButton.addEventListener("click", loadProjectCreation);
})();

// loadContent(createNewProjectForm);
// loadContent(createNewTaskForm);
/******/ })()
;
//# sourceMappingURL=main.js.map