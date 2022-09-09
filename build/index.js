import { subscribe } from "./modules/subscription.js";
import { init } from "./modules/state.js";
import { createRenderer, onTodoClick, onTodoSubmit } from "./modules/handlers.js";
const pending = document.querySelector("#pending ol");
const completed = document.querySelector("#completed ol");
if (pending && completed) {
    subscribe(createRenderer(pending, completed));
}
const create = document.getElementById("create");
init().then(() => {
    if (create) {
        create.onsubmit = onTodoSubmit;
    }
    if (pending) {
        pending.onclick = onTodoClick;
    }
    if (completed) {
        completed.onclick = onTodoClick;
    }
});
