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
        if (!userProjects.includes(project.id)) {
            userProjects.push(project.id);
        }
        localStorage.setItem(user, JSON.stringify(userProjects));

        localStorage.setItem(project.id, JSON.stringify(project));
    }

    static loadProject(id) {
        return Project.fromJSON(localStorage.getItem(id));
    }

    static removeProject(user, projectId) {
        const userProjects = JSON.parse(localStorage.getItem(user)) ?? [];
        const index = userProjects.indexOf(projectId);
        if (index !== -1) {
            userProjects.splice(index, 1);
            localStorage.setItem(user, JSON.stringify(userProjects));
            localStorage.removeItem(projectId);
        }
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