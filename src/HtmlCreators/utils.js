export function createElement(tagName, ...classList) {
    const element = document.createElement(tagName);

    for (const className of classList) {
        element.classList.add(className);
    }

    return element;
}

export function createFormRow() {
    return createElement("div", "form-row");
}

export function createMainTitle(text) {
    const titleDiv = createElement("div", "main-title");
    const icon = createElement("div", "title-icon", "icon");
    const textNode = document.createTextNode(text);
    titleDiv.appendChild(icon);
    titleDiv.appendChild(textNode);

    return titleDiv;
}

export function createLabelInput(data) {
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

export function createAddButton(text, ...classList) {
    const button = createElement("button", ...classList, "add-button");
    const plusIcon = createElement("span", "plus-icon", "icon");
    plusIcon.textContent = "+";

    const textNode = document.createTextNode(text);

    button.appendChild(plusIcon);
    button.appendChild(textNode);

    return button;
}