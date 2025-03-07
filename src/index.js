import "./style.css";
import createNewProjectForm from "./HtmlCreators/newProjectForm.js";
import createNewTaskForm from "./HtmlCreators/newTaskForm.js";
import createProjectViewer from "./HtmlCreators/projectViewer.js";
import ProjectsManager from "./ProjectsManager.js";
import Project from "./Project.js";
import Task from "./Task.js";

const loadContent = (function () {
    function listMyProjects() {
        const myProjectsContainer = document.querySelector(".my-projects-container");

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

        const createTaskButton = document.querySelector(".create-task");
        createTaskButton.addEventListener("click", loadTaskCreation);
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

    const createProjectButton = document.querySelector(".sidebar .create-project");
    createProjectButton.addEventListener("click", loadProjectCreation);
})();

// loadContent(createNewProjectForm);
// loadContent(createNewTaskForm);