import Project from "./Project.js";

export default class ProjectsDatabaseManager {
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
        userProjects.push(project.id);
        localStorage.setItem(user, JSON.stringify(userProjects));

        localStorage.setItem(project.id, JSON.stringify(project));
    }

    static loadProject(id) {
        return Project.fromJSON(localStorage.getItem(id))
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