import "./style.css";
import createNewProjectForm from "./HtmlCreators/newProjectForm.js";

const mainContainer = document.querySelector(".main-container");

mainContainer.innerHTML = "";
mainContainer.appendChild(createNewProjectForm());