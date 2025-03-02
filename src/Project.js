import Task from "./Task.js";

export default class Project {
    #tasks = [];

    constructor(id, title, description) {
        this.id = id;
        this.title = title;
        this.description = description;
    }

    addTask(task) {
        this.#tasks.push(task);
    }

    removeTask(index) {
        this.#tasks.splice(index, 1);
    }

    get tasks() {
        return [...this.#tasks];
    }

    toJSON() {
        return {
            title: this.title,
            description: this.description,
            tasks: this.#tasks
        }
    }

    fromJSON() {
        const data = typeof json === "string" ? JSON.parse(json) : json;

        const project = new Project(data.id, data.title, data.description);

        for (let i = 0; i < data.tasks.length; i++) {
            const task = data.tasks[i];
            project.addTask(Task.fromJSON(task));
        }

        return project;
    }
}