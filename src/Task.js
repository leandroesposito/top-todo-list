import Subtask from "./Subtask.js";

export default class Task {
    #subtasks = [];

    constructor(title, description, dueDate, priority, completed, notes) {
        this.title = title ?? "";
        this.description = description ?? "";
        this._dueDate = new Date(dueDate);
        this._priority = Task.validatePriority(priority);
        this.completed = Boolean(completed);
        this.notes = notes ?? "";
    }


    get priority() {
        return this._priority;
    }

    set priority(value) {
        this._priority = Task.validatePriority(value);
    }

    get dueDate() {
        return this._dueDate;
    }

    set dueDate(value) {
        this._dueDate = new Date(value);
    }

    get subtasks() {
        return [...this.#subtasks];
    }

    static validatePriority(value) {
        const parsedValue = parseInt(value);
        if (isNaN(parsedValue) || parsedValue < 0) {
            return 0;
        }
        return parsedValue;
    }

    completeTodo() {
        this.completed = true;

        for (let subtask of this.#subtasks) {
            subtask.setCompleteStatus(true);
        }
    }

    clearTodoCompletion() {
        this.completed = false;
    }

    completeSubtask(index) {
        if (this.#subtasks[index]) {
            this.#subtasks[index].setCompleteStatus(true);
        }
    }

    clearSubtaskCompletion(index) {
        if (this.#subtasks[index]) {
            this.#subtasks[index].setCompleteStatus(false);
        }
    }

    addSubtask(description) {
        this.#subtasks.push(new Subtask(description));
    }

    removeSubtask(index) {
        this.#subtasks.splice(index, 1);
    }

    static fromJson(json) {
        const data = JSON.parse(json);

        const task = new Task(
            data.title,
            data.description,
            data.dueDate,
            data.priority,
            data.completed,
            data.notes
        );

        for (let i = 0; i < data.subtasks.length; i++) {
            const subtask = data.subtasks[i];
            task.addSubtask(subtask.description);
            if (subtask.completed) {
                task.completeSubtask(i);
            }
        }

        return task;
    }

    toJSON() {
        return {
            title: this.title,
            description: this.description,
            dueDate: this._dueDate,
            priority: this._priority,
            completed: this.completed,
            notes: this.notes,
            subtasks: this.#subtasks
        }
    }
}