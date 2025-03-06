import "./style.css";
import createNewProjectForm from "./HtmlCreators/newProjectForm.js";
import createNewTaskForm from "./HtmlCreators/newTaskForm.js";


const loadContent = function (creatorFunction) {
    const mainContainer = document.querySelector(".main-container");

    mainContainer.innerHTML = "";
    mainContainer.appendChild(creatorFunction());
};

// loadContent(createNewProjectForm);
// loadContent(createNewTaskForm);