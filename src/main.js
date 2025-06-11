// Get Vue functions from the global Vue object provided by the CDN script
const { createApp, ref } = Vue;

// Create the Vue application instance
const app = createApp({
    setup() {
        // Reactive array to hold our to-do items
        const todos = ref([
            { id: 1, text: 'Clean the kitchen', completed: false },
            { id: 2, text: 'Read a book', completed: true },
        ]);

        // Reactive variable linked to the input field
        const newTodoText = ref('');

        // --- METHOD TO ADD A NEW TO-DO ---
        function addTodo() {
            if (newTodoText.value.trim() === '') {
                return;
            }
            const newTodo = {
                id: Date.now(), // Use timestamp for a simple unique ID
                text: newTodoText.value,
                completed: false
            };
            todos.value.unshift(newTodo);
            newTodoText.value = '';
        }

        // --- METHOD TO DELETE A TO-DO ---
        function removeTodo(idToDelete) {
            todos.value = todos.value.filter(todo => todo.id !== idToDelete);
        }

        // --- METHOD TO TOGGLE COMPLETION STATUS ---
        function toggleTodo(idToToggle) {
            const todo = todos.value.find(t => t.id === idToToggle);
            if (todo) {
                todo.completed = !todo.completed;
            }
        }

        // Expose all variables and functions to the HTML template
        return {
            todos,
            newTodoText,
            addTodo,
            removeTodo,
            toggleTodo
        };
    }
});

// Mount the application to the <div id="app"></div> in our HTML
app.mount('#app');