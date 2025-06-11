const { createApp, ref, watch } = Vue; // NEW: Added 'watch'

const app = createApp({
    setup() {
        // --- 1. LOAD a task ---
        // NEW: Try to load the saved list from localStorage.
        const savedTodos = JSON.parse(localStorage.getItem('cadt-todos'));

        // NEW: If there was a saved list, use it. Otherwise, start with a default list.
        const todos = ref(savedTodos || [
            { task: 'Read a book', completed: true, edit: false },
            { task: 'Create a Vue To-Do App', completed: false, edit: false },
            { task: 'បោសផ្ទះ (Sweep the house)', completed: false, edit: false }
        ]);

        const task = ref('');

        // --- 2. WATCH FOR CHANGES and SAVE tasks ---
        // NEW: This 'watch' function runs every time the 'todos' list changes.
        watch(todos, (newList) => {
            // Convert the list to a string and save it in localStorage under the key 'cadt-todos'.
            localStorage.setItem('cadt-todos', JSON.stringify(newList));
        }, {
            // NEW: 'deep: true' makes sure the watcher sees changes inside the objects,
            // like when we change 'item.completed' or 'item.edit'.
            deep: true
        });


        // --- YOUR EXISTING FUNCTIONS (No changes needed here) ---

        function addToList() {
            if (task.value.trim() === '') return;
            todos.value.unshift({ task: task.value, completed: false, edit: false });
            task.value = '';
        }

        function deleteTask(index) {
            todos.value.splice(index, 1);
        }

        function completeTask(index) {
            todos.value[index].completed = !todos.value[index].completed;
        }

        function setEdit(index) {
            todos.value.forEach((item, i) => {
                item.edit = (i === index);
            });
        }

        function finishEdit(index) {
            todos.value[index].edit = false;
        }

        function cancelEdit(index) {
            // This is a good place to also restore the original text if needed,
            // but for now, we just turn off edit mode.
            todos.value[index].edit = false;
        }


        return {
            todos,
            task,
            addToList,
            deleteTask,
            completeTask,
            setEdit,
            finishEdit,
            cancelEdit
        };
    }
});

app.mount('#app');