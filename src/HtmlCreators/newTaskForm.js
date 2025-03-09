import * as utils from "./utils.js"

function createSubtaskDiv() {
    const subtask = utils.createElement("div", "subtask");

    const input = document.createElement("input");
    input.type = "text";
    input.id = "subtask-description";
    input.name = "subtask-description[]";

    subtask.appendChild(input);
    const deleteIcon = utils.createElement("div", "delete-subtask", "x-icon", "icon", "red-icon");
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

export function createNewTaskForm() {
    const form = utils.createElement("form", "content");

    const projectTitleDiv = utils.createMainTitle("New Task");
    form.appendChild(projectTitleDiv);

    const titleRow = utils.createFormRow();
    const [titleLabel, titleInput] = utils.createLabelInput({
        label: "Task title",
        id: "task-title",
        labelClassList: ["section-title"],
        type: "text",
    });
    titleRow.appendChild(titleLabel);
    titleRow.appendChild(titleInput);
    form.appendChild(titleRow);

    const descriptionRow = utils.createFormRow();
    const [descriptionLabel, descriptionInput] = utils.createLabelInput({
        label: "Task description",
        id: "task-description",
        labelClassList: ["section-title"],
        type: "textarea",
    });
    descriptionRow.appendChild(descriptionLabel);
    descriptionRow.appendChild(descriptionInput);
    form.appendChild(descriptionRow);

    const dueDateRow = utils.createFormRow();
    const [dueDateLabel, dueDateInput] = utils.createLabelInput({
        label: "Due Date",
        id: "task-due-date",
        labelClassList: ["section-title"],
        type: "datetime-local",
    });
    dueDateInput.value = getFixedIsoDateString(new Date());
    dueDateRow.appendChild(dueDateLabel);
    dueDateRow.appendChild(dueDateInput);
    form.appendChild(dueDateRow);

    const priorityRow = utils.createFormRow();
    const [priorityLabel, priorityInput] = utils.createLabelInput({
        label: "Priority",
        id: "task-priority",
        labelClassList: ["section-title"],
        type: "number",
    });

    priorityInput.min = 0;
    priorityInput.max = 5;
    const priorityMinMaxIndicator = utils.createElement("div");
    priorityMinMaxIndicator.textContent = "(minimum: 0 | maximum: 5)";
    priorityLabel.appendChild(priorityMinMaxIndicator);

    priorityRow.appendChild(priorityLabel);
    priorityRow.appendChild(priorityInput);
    form.appendChild(priorityRow);

    const notesRow = utils.createFormRow();
    const [notesLabel, notesInput] = utils.createLabelInput({
        label: "Notes",
        id: "task-notes",
        labelClassList: ["section-title"],
        type: "textarea",
    });
    notesInput.rows = 10;
    notesRow.appendChild(notesLabel);
    notesRow.appendChild(notesInput);
    form.appendChild(notesRow);

    const subtasksRow = utils.createFormRow();
    subtasksRow.classList.add("subtasks");
    const [subtasksLabel, subtasksInput] = utils.createLabelInput({
        label: "Subtasks",
        id: "subtask-description",
        labelClassList: ["section-title"],
        type: "text",
    });
    subtasksInput.name = "subtask-description[]";

    const subtaskEmptyIndicator = utils.createElement("div");
    subtaskEmptyIndicator.textContent = "(empty subtasks will be ignored)";
    subtasksLabel.appendChild(subtaskEmptyIndicator);
    subtasksRow.appendChild(subtasksLabel);

    const subtask = utils.createElement("div", "subtask");
    subtask.appendChild(subtasksInput);
    const deleteIcon = utils.createElement("div", "delete-subtask", "x-icon", "icon", "red-icon");
    deleteIcon.addEventListener("click", () => subtask.remove());
    subtask.appendChild(deleteIcon);

    subtasksRow.appendChild(subtask);

    form.appendChild(subtasksRow);

    const buttonContainer = utils.createElement("div", "button-container");
    const createSubtaskButton = utils.createAddButton("Create Subtask", "create-subtask");
    createSubtaskButton.type = "button";
    createSubtaskButton.addEventListener("click", addSubtaskInput);
    buttonContainer.appendChild(createSubtaskButton);



    const createTaskButton = utils.createAddButton("Create Task", "create-task");
    buttonContainer.appendChild(createTaskButton);
    form.appendChild(buttonContainer);

    return form;
}

export function createEditTaskForm(task) {
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
    const saveIcon = utils.createElement("div", "save-icon", "icon");
    saveButton.appendChild(saveIcon);
    const textNode = document.createTextNode("Save Task");
    saveButton.appendChild(textNode);
    saveButton.classList.add("save-task");

    return form;
}