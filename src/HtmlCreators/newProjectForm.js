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
    }
    else {
        input = document.createElement("input");
        input.type = data.type;
    }
    input.id = data.id;
    input.name = data.id;

    return [label, input];
}

function createAddButton(text) {
    const button = createElement("button", "create-project", "add-button");
    const plusIcon = createElement("span", "plus-icon", "icon");
    plusIcon.textContent = "+";

    const textNode = document.createTextNode(text);

    button.appendChild(plusIcon);
    button.appendChild(textNode);

    return button;
}

export default function createNewProjectForm() {
    const form = document.createElement("form");
    form.classList.add("content");


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
        labelClassList: "section-title",
        type: "textarea",
    });
    descriptionRow.appendChild(descriptionLabel);
    descriptionRow.appendChild(descriptionInput);
    form.appendChild(descriptionRow);


    const buttonContainer = createElement("div", "buttons");
    const createButton = createAddButton("Create Project");
    buttonContainer.appendChild(createButton);
    form.appendChild(buttonContainer);

    return form;
}