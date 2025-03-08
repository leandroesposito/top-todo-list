import * as utils from "./utils.js"

export function createNewProjectForm() {
    const form = utils.createElement("form", "content");

    const projectTitleDiv = utils.createMainTitle("New Project");
    form.appendChild(projectTitleDiv);

    const titleRow = utils.createFormRow();
    const [titleLabel, titleInput] = utils.createLabelInput({
        label: "Project title",
        id: "project-title",
        labelClassList: ["section-title"],
        type: "text",
    });
    titleRow.appendChild(titleLabel);
    titleRow.appendChild(titleInput);
    form.appendChild(titleRow);

    const descriptionRow = utils.createFormRow();
    const [descriptionLabel, descriptionInput] = utils.createLabelInput({
        label: "Project description",
        id: "project-description",
        labelClassList: ["section-title"],
        type: "textarea",
    });
    descriptionRow.appendChild(descriptionLabel);
    descriptionRow.appendChild(descriptionInput);
    form.appendChild(descriptionRow);

    const buttonContainer = utils.createElement("div", "buttons");
    const createButton = utils.createAddButton("Create Project", "create-project");
    buttonContainer.appendChild(createButton);
    form.appendChild(buttonContainer);

    return form;
}

export function createEditProjectForm(project) {
    const form = createNewProjectForm();

    form.querySelector("#project-title").value = project.title;
    form.querySelector("#project-description").value = project.description;

    const saveButton = form.querySelector(".create-project");
    saveButton.textContent = "Save Project";
    saveButton.classList.add("save-project");

    return form;
}