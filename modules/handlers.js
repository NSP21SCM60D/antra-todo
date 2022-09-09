var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as model from "./state";
export const onTodoSubmit = (event) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (!(event.target instanceof HTMLFormElement))
        return;
    event.preventDefault();
    const title = (_b = (_a = event.target.todo) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : "";
    if (!title)
        return;
    yield model.createTodo(title);
    event.target.todo.value = "";
});
export const onTodoClick = (event) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    if (!(event.target instanceof HTMLElement))
        return;
    const { dataset: { type }, parentElement: parent } = event.target;
    const id = parent === null || parent === void 0 ? void 0 : parent.dataset.id;
    if (id === undefined)
        return;
    switch (type) {
        case "edit":
            const input = (_c = parent === null || parent === void 0 ? void 0 : parent.getElementsByTagName("input").namedItem("todo")) !== null && _c !== void 0 ? _c : null;
            yield onEditClick(id, input);
            break;
        case "delete":
            yield onDeleteClick(id);
            break;
        case "toggle":
            yield onToggleCompleted(id);
            break;
    }
});
const onEditClick = (id, input) => __awaiter(void 0, void 0, void 0, function* () {
    const todo = parseInt(id);
    if (isNaN(todo))
        return;
    const isStartingEdit = input === null;
    if (isStartingEdit) {
        yield model.startEdit(todo);
        return;
    }
    const title = input.value;
    yield model.editTitle(todo, title);
});
const onDeleteClick = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const todo = parseInt(id);
    if (isNaN(todo))
        return;
    yield model.deleteTodo(todo);
});
const onToggleCompleted = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const todo = parseInt(id);
    if (isNaN(todo))
        return;
    yield model.toggleCompleted(todo);
});
const pendingListItem = ({ id, title }, isEditing) => {
    const text = isEditing.has(id)
        ? `<input type="text" value="${title}"/>`
        : `<p>${title}</p>`;
    return `
        <li data-id="${id}">
            ${text}
            <button data-type="edit" type="button">
                <img src="assets/edit.svg" />
            </button>

            <button data-type="delete" type="button">
                <img src="assets/delete.svg" />
            </button>

            <button data-type="toggle" type="button">
                <img src="assets/right.svg" />
            </button>
        </li>`;
};
const completedListItem = ({ id, title }, isEditing) => {
    const text = isEditing.has(id)
        ? `<input type="text" value="${title}"/>`
        : `<p>${title}</p>`;
    return `
        <li data-id="${id}">
            <button data-type="toggle" type="button">
                <img src="assets/left.svg" />
            </button>
            ${text}
            <button data-type="edit" type="button">
                <img src="assets/edit.svg" />
            </button>
            <button data-type="delete" type="button">
                <img src="assets/delete.svg" />
            </button>
        </li>`;
};
export const createRenderer = (pending, completed) => {
    return (todos, isEditing) => {
        const pendingItems = todos
            .filter(t => !t.isCompleted)
            .map(t => pendingListItem(t, isEditing));
        const completedItems = todos
            .filter(t => t.isCompleted)
            .map(t => completedListItem(t, isEditing));
        pending.innerHTML = pendingItems.join('\n');
        completed.innerHTML = completedItems.join('\n');
    };
};
