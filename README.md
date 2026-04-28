# Todo List App - OOP, JSON & LocalStorage Deep Dive

A comprehensive todo list application built with Webpack, demonstrating Object-Oriented Programming principles, JSON serialization, localStorage persistence, and ES6 modules.

## Learning Objectives

This project was specifically designed to demonstrate and practice:

- **JS Classes** - ES6 class syntax with private fields and methods
- **ES6 Modules** - Import/export patterns for modular architecture
- **npm** - Package management and script automation
- **Webpack** - Module bundling for development and production
- **JSON** - Data serialization and deserialization
- **localStorage** - Client-side data persistence
- **OOP Principles** - Encapsulation, abstraction, inheritance, and polymorphism

## Live Demo

[View Live Demo](https://leandroesposito.github.io/top-todo-list/)

## Project Architecture Overview

### 1. Object-Oriented Programming Principles

#### Encapsulation (Private Fields)

The project uses **true encapsulation** with ES6 private class fields (`#`):

```javascript
// Task.js - Private fields and methods
export default class Task {
    #subtasks = [];  // Private field - cannot be accessed outside class

    constructor(title, description, dueDate, priority, completed, notes) {
        this.title = title ?? "";
        this.description = description ?? "";
        this._dueDate = new Date(dueDate);
        this._priority = Task.validatePriority(priority);
        this.completed = Boolean(completed);
        this.notes = notes ?? "";
    }

    get subtasks() {
        return [...this.#subtasks];  // Returns a COPY, not the original array
    }

    addSubtask(description) {
        if (!description) return;
        this.#subtasks.push(new Subtask(description));  // Controlled access
    }

    removeSubtask(index) {
        this.#subtasks.splice(index, 1);  // Controlled modification
    }
}

// Subtask.js - Private completed status
export default class Subtask {
    #completed = false;  // Cannot be modified directly from outside

    setCompleteStatus(status) {
        this.#completed = Boolean(status);  // Controlled setter
    }

    get completed() {
        return this.#completed;  // Read-only access
    }
}
```

**Why private fields?**

- True encapsulation (not just convention with `_` prefix)
- Prevents external code from directly modifying internal state
- Maintains data integrity through controlled access methods

#### Abstraction

Complex operations are hidden behind simple interfaces:

```javascript
// Project.js - Abstracted task management
export default class Project {
    #tasks = [];  // Internal representation hidden

    addTask(task) { /* ... */ }      // Simple public method
    removeTask(index) { /* ... */ }  // Hides array manipulation logic
    get tasks() { return [...this.#tasks]; }  // Returns copy, not reference
}

// Task.js - Abstracted time calculation
get remainingTime() {
    // Complex date math hidden behind a simple property
    const currentTime = new Date().getTime();
    const isNegative = this._dueDate.getTime() < currentTime;
    const difference = Math.abs(this._dueDate.getTime() - currentTime);

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)));
    const minutes = Math.floor((difference % (1000 * 60 * 60) / (1000 * 60)));

    return { isNegative, days, hours, minutes };
}
```

#### Polymorphism (JSON Methods)

Each class implements its own `toJSON()` and `fromJSON()` methods:

```javascript
// Project.js
toJSON() {
    return {
        id: this.id,
        title: this.title,
        description: this.description,
        tasks: this.#tasks  // Polymorphic - Task.toJSON() called automatically
    }
}

static fromJSON(json) {
    const data = typeof json === "string" ? JSON.parse(json) : json;
    const project = new Project(data.title, data.description, data.id);

    for (let i = 0; i < data.tasks.length; i++) {
        project.addTask(Task.fromJSON(data.tasks[i]));  // Polymorphic call
    }
    return project;
}

// Task.js
toJSON() {
    return {
        title: this.title,
        description: this.description,
        dueDate: this._dueDate,
        priority: this._priority,
        completed: this.completed,
        notes: this.notes,
        subtasks: this.#subtasks  // Subtask.toJSON() called automatically
    }
}

static fromJSON(json) {
    const data = typeof json === "string" ? JSON.parse(json) : json;
    const task = new Task(
        data.title, data.description, data.dueDate,
        data.priority, data.completed, data.notes
    );

    for (let i = 0; i < data.subtasks.length; i++) {
        task.addSubtask(data.subtasks[i].description);
        if (data.subtasks[i].completed) task.completeSubtask(i);
    }
    return task;
}
```

### 2. JSON (JavaScript Object Notation)

The project uses **JSON** for data serialization and storage:

#### Serialization (Object → JSON)

```javascript
// ProjectsDatabaseManager.js
static saveProject(user, project) {
    const userProjects = JSON.parse(localStorage.getItem(user)) ?? [];
    if (!userProjects.includes(project.id)) {
        userProjects.push(project.id);
    }
    localStorage.setItem(user, JSON.stringify(userProjects));  // Serialize array

    localStorage.setItem(project.id, JSON.stringify(project));  // Serialize project
}
```

#### Deserialization (JSON → Object)

```javascript
// ProjectsDatabaseManager.js
static loadProject(id) {
    return Project.fromJSON(localStorage.getItem(id));  // Parse and reconstruct
}

static getUserProjects(user) {
    const userProjects = JSON.parse(localStorage.getItem(user)) ?? [];
    const projects = [];

    for (const projectId of userProjects) {
        projects.push(ProjectsDatabaseManager.loadProject(projectId));
    }
    return projects;
}
```

**JSON in action:**

- `JSON.stringify()` - Converts objects to JSON strings for storage
- `JSON.parse()` - Converts JSON strings back to JavaScript objects
- Custom `toJSON()` methods control serialization behavior
- Static `fromJSON()` methods handle deserialization

### 3. localStorage API

The project uses **localStorage** for persistent data storage:

```javascript
// ProjectsDatabaseManager.js
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
    localStorage.setItem(user, JSON.stringify(userProjects));
    localStorage.setItem(project.id, JSON.stringify(project));
  }

  static loadProject(id) {
    return Project.fromJSON(localStorage.getItem(id));
  }

  static removeProject(user, projectId) {
    localStorage.removeItem(projectId); // Delete project data
  }
}
```

**localStorage features demonstrated:**

- `setItem(key, value)` - Store data
- `getItem(key)` - Retrieve data
- `removeItem(key)` - Delete data
- Data persists across browser sessions
- 5-10MB storage limit per origin

### 4. ES6 Modules Pattern

The project uses **ES6 modules** with clear separation of concerns:

```javascript
// Project.js - Domain model
import Task from "./Task.js";
export default class Project { /* ... */ }

// Task.js - Domain model
import Subtask from "./Subtask.js";
export default class Task { /* ... */ }

// Subtask.js - Domain model
export default class Subtask { /* ... */ }

// ProjectsDatabaseManager.js - Data persistence
import Project from "./Project.js";
export default class ProjectsDatabaseManager { /* ... */ }

// ProjectsManager.js - Business logic
import ProjectsDatabaseManager from "./ProjectsDatabaseManager";
export default class ProjectsManager { /* ... */ }

// HtmlCreators/*.js - UI generation
import * as utils from "./utils.js"
export function createNewProjectForm() { /* ... */ }
export function createNewTaskForm() { /* ... */ }
```

**Module organization:**

- Domain models (`Project.js`, `Task.js`, `Subtask.js`)
- Data layer (`ProjectsDatabaseManager.js`)
- Business logic (`ProjectsManager.js`)
- UI layer (`HtmlCreators/*.js`)
- Utilities (`utils.js`)

### 5. Class Composition and Relationships

```javascript
// Composition relationship: Project contains Tasks
class Project {
  #tasks = []; // Project COMPOSES Task objects

  addTask(task) {
    this.#tasks.push(task);
  }
  get tasks() {
    return [...this.#tasks];
  }
}

// Composition relationship: Task contains Subtasks
class Task {
  #subtasks = []; // Task COMPOSES Subtask objects

  addSubtask(description) {
    this.#subtasks.push(new Subtask(description));
  }
}

// Manager pattern: ProjectsManager manages Projects
class ProjectsManager {
  constructor(user) {
    this.user = user;
    this.projects = []; // Manages collection of Project objects
    this.currenProject = null;
  }

  addProject(project) {
    /* ... */
  }
  removeProject(projectId) {
    /* ... */
  }
  saveProject(project) {
    /* ... */
  }
}
```

### 6. Webpack Configuration

#### Development vs Production

```javascript
// webpack.dev.js - Fast development builds
module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map", // Fast source maps
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"], // Injects CSS into DOM
      },
    ],
  },
});

// webpack.prod.js - Optimized production builds
module.exports = merge(common, {
  mode: "production",
  devtool: "source-map", // Full source maps
  plugins: [
    new MiniCssExtractPlugin({
      // Extracts CSS to separate file
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin()], // Minifies CSS
  },
});
```

## Project Structure

```
todo-list-app/
├── src/
│   ├── index.js                    # Entry point
│   ├── Project.js                  # Project class (OOP)
│   ├── Task.js                     # Task class (OOP)
│   ├── Subtask.js                  # Subtask class (OOP)
│   ├── ProjectsManager.js          # Business logic layer
│   ├── ProjectsDatabaseManager.js  # localStorage abstraction
│   ├── style.css                   # Global styles
│   ├── template.html               # HTML template
│   └── HtmlCreators/               # UI generation modules
│       ├── utils.js                # DOM utilities
│       ├── newProjectForm.js       # Project form builder
│       ├── newTaskForm.js          # Task form builder
│       └── projectViewer.js        # Project display builder
├── webpack.common.js               # Shared config
├── webpack.dev.js                  # Development config
├── webpack.prod.js                 # Production config
└── package.json                    # npm configuration
```

## Data Flow Diagram

```
User Action (UI)
       ↓
Event Listener (index.js)
       ↓
ProjectsManager (Business Logic)
       ↓
Project/Task/Subtask (Domain Models)
       ↓
ProjectsDatabaseManager (Data Layer)
       ↓
localStorage (Persistence)
       ↓
JSON.stringify/parse (Serialization)
```

## OOP Principles Summary

| Principle           | Implementation                                       | Example                                              |
| ------------------- | ---------------------------------------------------- | ---------------------------------------------------- |
| **Encapsulation**   | Private fields (`#tasks`, `#subtasks`, `#completed`) | External code cannot directly modify internal arrays |
| **Abstraction**     | Simplified public methods hiding complexity          | `remainingTime` property hides date math             |
| **Polymorphism**    | `toJSON()` and `fromJSON()` on all classes           | Same method name, different implementations          |
| **Composition**     | Project contains Tasks, Tasks contain Subtasks       | "Has-a" relationships                                |
| **Manager Pattern** | ProjectsManager orchestrates operations              | Separates business logic from data persistence       |

## localStorage Structure

```javascript
// Example data structure in localStorage
localStorage: {
    "User 1": ["abc123", "def456", "ghi789"],  // User's project IDs
    "abc123": {                                 // Project data
        "id": "abc123",
        "title": "My Project",
        "description": "Project description",
        "tasks": [...]                          // Array of Task objects
    },
    "def456": { ... }                           // Another project
}
```

## JSON Serialization Process

```javascript
// 1. Object → JSON string
Project instance → project.toJSON() → JSON.stringify() → JSON string

// 2. JSON string → Object
JSON string → JSON.parse() → Project.fromJSON() → Project instance

// 3. Automatic nesting (polymorphism)
Project.toJSON() calls Task.toJSON() which calls Subtask.toJSON()
```

## Development vs Production

| Feature              | Development                 | Production                 |
| -------------------- | --------------------------- | -------------------------- |
| **Mode**             | `development`               | `production`               |
| **Source Maps**      | `eval-source-map` (fast)    | `source-map` (complete)    |
| **CSS Handling**     | Injected via `style-loader` | Extracted to `.css` file   |
| **CSS Minification** | No                          | Yes (`CssMinimizerPlugin`) |
| **Build Speed**      | Fast                        | Slower (optimizations)     |
| **Debugging**        | Easy (eval source maps)     | Harder (full rebuild)      |

## npm Scripts

| Script   | Command                                          | Purpose                            |
| -------- | ------------------------------------------------ | ---------------------------------- |
| `start`  | `webpack serve --config webpack.dev.js`          | Development server with hot reload |
| `build`  | `webpack --config webpack.prod.js`               | Production build to `/dist`        |
| `deploy` | `git subtree push --prefix dist origin gh-pages` | Deploy to GitHub Pages             |

## Key Takeaways

### OOP in JavaScript

- **Private fields** (`#`) provide true encapsulation
- **Getters** can return copies to prevent external modification
- **Static methods** (`fromJSON`) serve as factory functions
- **Composition** over inheritance (Project contains Tasks)

### JSON & localStorage

- `JSON.stringify()` + `JSON.parse()` for persistence
- Custom `toJSON()` methods control serialization
- Static `fromJSON()` methods handle reconstruction
- localStorage persists data across browser sessions

### Webpack

- Environment-specific configurations
- Development vs production optimizations
- CSS extraction and minification
- Module bundling for clean code organization

### ES6 Modules

- Clear separation of concerns
- Explicit dependencies via imports
- Default vs named exports
- No global namespace pollution
