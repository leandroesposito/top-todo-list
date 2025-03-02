export default class Subtask {
    #completed = false;

    constructor(description, completed) {
        this.description = description;
        this.#completed = Boolean(completed);
    }

    setCompleteStatus(status) {
        this.#completed = Boolean(status);
    }

    get completed() {
        return this.#completed;
    }

    toJSON() {
        return {
            description: this.description,
            completed: this.#completed
        }
    }
}