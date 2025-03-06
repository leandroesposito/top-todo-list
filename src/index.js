import "./style.css";
import createNewProjectForm from "./HtmlCreators/newProjectForm.js";

const loadContent = function (creatorFunction) {
    const mainContainer = document.querySelector(".main-container");

    mainContainer.innerHTML = "";
    mainContainer.appendChild(creatorFunction());
};

// loadContent(createNewProjectForm());