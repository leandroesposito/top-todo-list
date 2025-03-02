export default class Project {
    #tasks = [];

    constructor(title, description) {
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
}