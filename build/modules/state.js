var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as api from "./api/todos.js";
let _filter;
const _todos = [];
const _isEditing = new Set();
const _subscriptions = new Set();
export const loadTodos = () => __awaiter(void 0, void 0, void 0, function* () {
    _todos.push(...yield api.getTodos());
    invoke();
});
export const subscribe = (listener) => {
    _subscriptions.add(listener);
    return () => {
        _subscriptions.delete(listener);
    };
};
const invoke = () => {
    for (const sub of _subscriptions) {
        setTimeout(sub, 0, _todos, _isEditing, _filter);
    }
};
export const createTodo = (title) => __awaiter(void 0, void 0, void 0, function* () {
    const newTodo = yield api.addTodo(title);
    if (newTodo === null)
        return;
    _todos.push(newTodo);
    invoke();
});
export const setFilter = (filter) => {
    _filter = filter === "" ? undefined : filter;
    invoke();
};
export const editTitle = (id, title) => __awaiter(void 0, void 0, void 0, function* () {
    const edited = yield api.editTitle(id, title);
    if (edited === null)
        return;
    const index = findIndex(id);
    if (index === null)
        return;
    _todos[index] = edited;
    _isEditing.delete(id);
    invoke();
});
export const startEdit = (id) => {
    _isEditing.add(id);
    invoke();
};
export const toggleCompleted = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const edited = yield api.toggleStatus(id);
    if (edited === null)
        return;
    const index = findIndex(id);
    if (index === null)
        return;
    _todos[index] = edited;
    _isEditing.delete(id);
    invoke();
});
export const deleteTodo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isDeleted = yield api.deleteTodo(id);
    if (!isDeleted)
        return;
    const index = findIndex(id);
    if (index === null)
        return;
    _todos.splice(index, 1);
    _isEditing.delete(id);
    invoke();
});
const findIndex = (id) => {
    const initial = null;
    return _todos.reduce((idx, t, i) => t.id === id ? i : idx, initial);
};
