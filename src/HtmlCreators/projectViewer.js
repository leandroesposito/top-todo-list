import * as utils from "./utils.js"

function createSubtask(subtask) {
    const subtaskDiv = utils.createElement("div", "subtask");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = subtask.completed;
    subtaskDiv.appendChild(input);
    const subtaskDescriptionDiv = utils.createElement("div", "subtask-description");
    subtaskDescriptionDiv.textContent = subtask.description;
    subtaskDiv.appendChild(subtaskDescriptionDiv);

    return subtaskDiv;
}

function createTask(task) {
    const taskContainer = utils.createElement("div", "task");
    const titleDiv = utils.createElement("div", "section-title");
    const textNode = document.createTextNode(task.title);
    const editIcon = utils.createElement("div", "edit-task", "dots-icon", "icon");
    titleDiv.appendChild(textNode);
    titleDiv.appendChild(editIcon);
    taskContainer.appendChild(titleDiv);

    const detailsDiv = utils.createElement("div", "task-status-details");
    const priorityDiv = utils.createElement("div", "task-priority");
    priorityDiv.setAttribute("data-priority", task.priority);
    detailsDiv.appendChild(priorityDiv);

    const completeStatusDiv = utils.createElement("div", "task-complete-status");
    completeStatusDiv.setAttribute("data-complete-status", task.completed ? "completed" : "pending");
    detailsDiv.appendChild(completeStatusDiv);

    const dueDateDiv = utils.createElement("div", "task-due-date");
    const remainingTime = task.remainingTime;
    dueDateDiv.textContent = `⏳ ${remainingTime.isNegative ? "-" : ""} ${remainingTime.days} days ${remainingTime.hours} hours ${remainingTime.minutes} minutes ${remainingTime.seconds} seconds remaining`;
    detailsDiv.appendChild(dueDateDiv);
    taskContainer.appendChild(detailsDiv);

    const subtasksDiv = utils.createElement("div", "task-subtasks");
    task.subtasks.forEach(subtask => {
        const subtaskDiv = createSubtask(subtask);
        subtasksDiv.appendChild(subtaskDiv);
    });
    taskContainer.appendChild(subtasksDiv);

    const notesTitle = utils.createElement("div", "section-title");
    notesTitle.textContent = "Notes";
    const notesDiv = utils.createElement("div", "task-notes");
    const notesContent = utils.createElement("pre");
    notesContent.textContent = task.notes;
    notesDiv.appendChild(notesContent);
    taskContainer.appendChild(notesDiv);

    return taskContainer;
}


export default function createProjectViewer(project) {
    const content = utils.createElement("div", "content");

    const projectTitleDiv = utils.createMainTitle(project.title);
    const editIcon = utils.createElement("div", "edit-project", "dots-icon", "icon");
    projectTitleDiv.appendChild(editIcon);
    content.appendChild(projectTitleDiv);

    const projectDescriptionDiv = utils.createElement("div", "project-description");
    projectDescriptionDiv.textContent = project.description;
    content.appendChild(projectDescriptionDiv);

    const tasksContainer = utils.createElement("div", "tasks");
    project.tasks.forEach(task => {
        tasksContainer.appendChild(createTask(task));
    });
    content.appendChild(tasksContainer);

    const buttonDiv = utils.createElement("div", "buttons");
    const createButton = utils.createAddButton("Create Task", "create-task");
    buttonDiv.appendChild(createButton);
    content.appendChild(buttonDiv);

    return content;
}