# vue-loop

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
"# Todo-List-vue-" 

!Note 

app.js: The Application Logic
This file is the brain of the To-Do application. It's built using the Vue 3 Composition API and handles all state management, user interactions, and data persistence.

Core Concepts
The application logic is centered around a few key Vue.js concepts:

createApp: Initializes the Vue application instance.
ref: Creates a "reactive" reference. Any data wrapped in ref() will automatically trigger UI updates when its value changes.
watch: Monitors a reactive reference (ref) and executes a function whenever the data changes. We use this for auto-saving.
Data Persistence: localStorage
To ensure tasks aren't lost when the user refreshes or closes the browser, the application uses the browser's localStorage.

Loading Data on Startup
When the app first loads, it immediately checks for a previously saved list.

JavaScript

// --- 1. LOAD TASKS ---
const savedTodos = JSON.parse(localStorage.getItem('cadt-todos'));

const todos = ref(savedTodos || [
    // ... default tasks if nothing is saved
]);
It attempts to get the JSON string from localStorage with the key 'cadt-todos'.
JSON.parse() converts the string back into a JavaScript array.
The todos state is initialized with the savedTodos or a default array if no saved data exists.
Auto-Saving on Change
A watch function monitors the todos array for any changes and immediately saves the updated list back to localStorage.

JavaScript

// --- 2. WATCH FOR CHANGES & SAVE TASKS ---
watch(todos, (newList) => {
    localStorage.setItem('cadt-todos', JSON.stringify(newList));
}, {
    deep: true
});
JSON.stringify() converts the array into a string for storage.
The { deep: true } option is crucial; it ensures the watcher detects changes made inside the task objects (like toggling completed or changing task text), not just additions or deletions to the array.
State and Functions
All application state and methods are defined within the setup() function.

Reactive State
todos: A reactive array holding all the to-do item objects.
task: A reactive string linked to the new task input field via v-model.
Core Functions
These functions handle all user actions and manipulate the todos state.

addToList():

Checks if the input task is empty.
Creates a new task object.
Adds the new object to the beginning of the todos array using unshift().
Clears the input field.
deleteTask(index): Removes the item at the specified index from the todos array using splice().

completeTask(index): Toggles the boolean completed property of the task at the specified index.

setEdit(index): Enables "edit mode" for one item while ensuring all others are not in edit mode. It loops through the todos array and sets the edit property to true only for the selected item.

finishEdit(index) & cancelEdit(index): Both functions simply set the edit property of the specified task back to false to exit "edit mode".

Application Initialization
Finally, the logic is connected to the DOM.

JavaScript

return {
    todos,
    task,
    addToList,
    // ... all other functions
};
The setup function returns an object containing all the state and functions that need to be accessible from the index.html template.

JavaScript

app.mount('#app');
This command mounts the Vue application instance to the HTML element with the ID app, bringing the application to life.
