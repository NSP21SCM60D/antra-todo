import createRenderer from "./modules/render.js";
import { loadTodos, subscribe } from "./modules/state.js";
import { onEditEnter, onTodoClick, onFilterSubmit, onTodoSubmit } from "./modules/handlers.js";
const pending = document.querySelector("#pending ol");
const completed = document.querySelector("#completed ol");
if (pending && completed) {
    subscribe(createRenderer(pending, completed));
}
const create = document.getElementById("create");
const filter = document.getElementById("filter");
loadTodos().then(() => {
    if (create) {
        create.onsubmit = onTodoSubmit;
    }
    if (filter) {
        filter.onsubmit = onFilterSubmit;
    }
    if (pending) {
        pending.onclick = onTodoClick;
        pending.onkeyup = onEditEnter;
    }
    if (completed) {
        completed.onclick = onTodoClick;
        completed.onkeyup = onEditEnter;
    }
});
