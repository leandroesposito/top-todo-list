import ProjectsDatabaseManager from "./ProjectsDatabaseManager";

export default class ProjectsManager {
    constructor(user) {
        this.user = user;
        this.projects = ProjectsDatabaseManager.getUserProjects(user);
        this.currenProject = this.projects[0] ?? null;
    }

    addProject(project) {
        this.projects.push(project);
        this.currenProject = project;
        this.saveProject(project);
    }

    saveProject(project) {
        if (!project) {
            project = this.currenProject;
        };
        ProjectsDatabaseManager.saveProject(this.user, project)
    }

    addTask(task) {
        this.currenProject.addTask(task);
        this.saveProject(this.currenProject);
    }

    addSubtask(taskIndex, subtask) {
        const task = this.currenProject.tasks[taskIndex];
        task.addSubtask(subtask);
        this.saveProject(this.currenProject);
    }

    removeTask(taskIndex) {
        this.currenProject.removeTask(taskIndex);
        this.saveProject(this.currenProject);
    }

    replaceTask(taskIndex, task) {
        this.currenProject.replaceTask(taskIndex, task);
        this.saveProject(this.currenProject);
    }

    setCurrentProject(projectIndex) {
        this.currenProject = this.projects[projectIndex];

        return this.currenProject;
    }
}