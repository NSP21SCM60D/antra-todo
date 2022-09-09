var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as api from "./api/todos";
import { subscribe, invoke } from "./subscription";
const _isEditing = new Set();
let _todos;
const getTodos = () => __awaiter(void 0, void 0, void 0, function* () {
    if (_todos === undefined) {
        subscribe((ts) => _todos = ts);
        _todos = yield api.getTodos();
    }
    return _todos;
});
export const init = () => __awaiter(void 0, void 0, void 0, function* () { const _ = yield getTodos(); });
export const createTodo = (title) => __awaiter(void 0, void 0, void 0, function* () {
    const newTodo = yield api.addTodo(title);
    if (newTodo === null)
        return;
    const todos = yield getTodos();
    const updated = [...todos, newTodo];
    invoke(updated, _isEditing);
});
export const editTitle = (id, title) => __awaiter(void 0, void 0, void 0, function* () {
    const edited = yield api.editTitle(id, title);
    if (edited === null)
        return;
    const todos = yield getTodos();
    const updated = todos.map(t => t.id === edited.id ? edited : t);
    _isEditing.delete(id);
    invoke(updated, _isEditing);
});
export const startEdit = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = yield getTodos();
    _isEditing.add(id);
    invoke(todos, _isEditing);
});
export const toggleCompleted = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const edited = yield api.toggleStatus(id);
    if (edited === null)
        return;
    const todos = yield getTodos();
    const updated = todos.map(t => t.id === edited.id ? edited : t);
    _isEditing.delete(id);
    invoke(updated, _isEditing);
});
export const deleteTodo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isDeleted = yield api.deleteTodo(id);
    if (!isDeleted)
        return;
    const todos = yield getTodos();
    const removed = todos.filter(t => t.id !== id);
    _isEditing.delete(id);
    invoke(removed, _isEditing);
});
