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

1. Setting up Vue
JavaScript

const { createApp, ref, watch } = Vue; // NEW: Added 'watch'
This line imports three essential functions from the global Vue object (which is available because you included Vue via a <script> tag).
createApp: The function used to create your entire Vue application.
ref: A function that makes a variable "reactive." This means if the variable's value changes, Vue will automatically update the parts of your HTML that use it. It's the core of Vue's reactivity system. We use it for the list of tasks and the text in the input box.
watch: A function that "watches" a reactive variable (ref) and runs a function every time that variable's value changes. We use this to automatically save our to-do list.
JavaScript

const app = createApp({
    // ... all our logic goes here
});
This creates the main instance of your Vue application. All the logic will be contained inside this object.
2. The setup() Function
JavaScript

setup() {
    // ...
}
setup() is the entry point for the Composition API. It's where we define all our reactive data, functions, and logic for this component of the application.
3. Loading and Initializing Data
JavaScript

// --- 1. LOAD a task ---
const savedTodos = JSON.parse(localStorage.getItem('cadt-todos'));
localStorage.getItem('cadt-todos'): This attempts to get a string of data from the browser's localStorage that was saved under the key 'cadt-todos'. localStorage is storage that persists even after you close the browser.
JSON.parse(...): localStorage can only store text (strings). Our list of to-dos is an array of objects. JSON.parse() converts the saved text string back into a proper JavaScript array. If nothing was saved, getItem returns null.
JavaScript

const todos = ref(savedTodos || [
    { task: 'Read a book', completed: true, edit: false },
    { task: 'Create a Vue To-Do App', completed: false, edit: false },
    { task: 'បោសផ្ទះ (Sweep the house)', completed: false, edit: false }
]);
This line initializes our main todos list. It uses a common JavaScript trick with the || (OR) operator.
It means: Use savedTodos if it has a value (i.e., we successfully loaded data). OR, if savedTodos is null (because nothing was saved), use this default array of three tasks instead.
ref(...): The entire list is wrapped in ref() to make it reactive. Now, any change to this todos array will cause the HTML to update automatically.
JavaScript

const task = ref('');
This creates another reactive variable named task. It's an empty string that is directly linked to the input box in your HTML via v-model="task". When you type in the box, task.value updates.
4. The "Auto-Save" Watcher
JavaScript

// --- 2. WATCH FOR CHANGES and SAVE tasks ---
watch(todos, (newList) => {
    localStorage.setItem('cadt-todos', JSON.stringify(newList));
}, {
    deep: true
});
This is the powerful auto-save feature.
watch(todos, ...): It tells Vue to monitor the todos reactive variable.
(newList) => { ... }: This function will execute automatically every time todos changes. newList will be the new, updated value of the todos array.
localStorage.setItem('cadt-todos', JSON.stringify(newList)): Inside the function, we save the data. JSON.stringify(newList) converts our array of objects back into a text string, which is then saved to localStorage under the key 'cadt-todos'.
{ deep: true }: This is a very important option. By default, watch only triggers if you replace the whole array. deep: true tells watch to look for changes inside the array, such as when you change a single item's completed status from false to true.
5. User Action Functions
These are the functions that are called when you click buttons in the HTML.

JavaScript

function addToList() {
    if (task.value.trim() === '') return;
    todos.value.unshift({ task: task.value, completed: false, edit: false });
    task.value = '';
}
This function adds a new task.
It checks if the input text (after trimming whitespace) is empty. If so, it does nothing.
todos.value.unshift(...): It creates a new task object and adds it to the beginning of the todos array. (.value is used to access the data inside a ref).
task.value = '': It clears the input box.
JavaScript

function deleteTask(index) {
    todos.value.splice(index, 1);
}
This function deletes a task. It uses the index of the item to be deleted.
splice(index, 1): This is a standard JavaScript array method that removes 1 item starting at the given index.
JavaScript

function completeTask(index) {
    todos.value[index].completed = !todos.value[index].completed;
}
This toggles the completion status of a task.
!todos.value[index].completed: The ! (NOT) operator flips the boolean value. If completed was false, it becomes true, and vice-versa.
JavaScript

function setEdit(index) {
    todos.value.forEach((item, i) => {
        item.edit = (i === index);
    });
}
This function enables "edit mode" for a single item.
It loops through every item in the todos list. It sets the edit property to true only for the item whose index i matches the index that was clicked. All other items will have their edit property set to false. This ensures only one item can be edited at a time.
JavaScript

function finishEdit(index) {
    todos.value[index].edit = false;
}
function cancelEdit(index) {
    todos.value[index].edit = false;
}
Both of these functions simply turn off "edit mode" for the specified item, causing the view to switch back from the input box to the regular text display.
6. Returning and Mounting
JavaScript

return {
    todos,
    task,
    addToList,
    // ...all other functions
};
At the end of setup(), you must return an object containing all the variables and functions you want to use in your HTML template. This makes them accessible to v-for, @click, etc.
JavaScript

app.mount('#app');
Finally, this command takes the Vue application we have configured (app) and activates it on the HTML element with the ID app (<div id="app">). This brings your application to life.
