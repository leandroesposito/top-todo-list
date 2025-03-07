import Task from "./Task.js";

export default class Project {
    #tasks = [];

    constructor(title, description, id) {
        this.id = id ?? Date.now().toString(36);
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
            id: this.id,
            title: this.title,
            description: this.description,
            tasks: this.#tasks
        }
    }

    static fromJSON(json) {
        const data = typeof json === "string" ? JSON.parse(json) : json;

        const project = new Project(data.title, data.description, data.id);

        for (let i = 0; i < data.tasks.length; i++) {
            const task = data.tasks[i];
            project.addTask(Task.fromJSON(task));
        }

        return project;
    }
}