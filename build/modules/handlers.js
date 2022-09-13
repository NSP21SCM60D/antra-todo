var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as model from "./state.js";
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
export const onFilterSubmit = (event) => {
    var _a, _b;
    if (!(event.target instanceof HTMLFormElement))
        return;
    event.preventDefault();
    const filter = (_b = (_a = event.target.filter) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : "";
    model.setFilter(filter);
};
export const onEditEnter = (event) => __awaiter(void 0, void 0, void 0, function* () {
    if (event.key !== "Enter")
        return;
    event.stopPropagation();
    const input = document.activeElement;
    if (!(input instanceof HTMLInputElement))
        return;
    const parent = input.parentElement;
    if (!(parent instanceof HTMLLIElement))
        return;
    const id = parent.dataset.id;
    if (id === undefined)
        return;
    const todo = parseInt(id);
    const title = input.value;
    if (isNaN(todo))
        return;
    yield model.editTitle(todo, title);
});
export const onTodoClick = (event) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    event.preventDefault();
    event.stopPropagation();
    if (!(event.target instanceof HTMLElement))
        return;
    const button = getButton(event.target);
    if (button === null)
        return;
    const { dataset: { type }, parentElement: parent } = button;
    const id = parent === null || parent === void 0 ? void 0 : parent.dataset.id;
    if (id === undefined)
        return;
    switch (type) {
        case "edit":
            const title = (_c = parent === null || parent === void 0 ? void 0 : parent.getElementsByTagName("input").item(0)) === null || _c === void 0 ? void 0 : _c.value;
            yield onEditClick(id, title !== null && title !== void 0 ? title : null);
            break;
        case "delete":
            yield onDeleteClick(id);
            break;
        case "toggle":
            yield onToggleCompleted(id);
            break;
        default:
            break;
    }
});
const getButton = (elem) => {
    let check = elem;
    while (check && !(check instanceof HTMLButtonElement)) {
        check = check.parentElement;
    }
    return check;
};
const onEditClick = (id, title) => __awaiter(void 0, void 0, void 0, function* () {
    const todo = parseInt(id);
    if (isNaN(todo))
        return;
    if (title === null) {
        model.startEdit(todo);
    }
    else {
        yield model.editTitle(todo, title);
    }
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
