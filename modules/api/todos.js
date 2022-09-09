"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.toggleStatus = exports.editTitle = exports.addTodo = exports.getTodos = void 0;
const url = "localhost:3000/todos";
const getTodos = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(url);
    if (!response.ok)
        return [];
    return yield response.json();
});
exports.getTodos = getTodos;
const addTodo = (title) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(url, {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({ title }),
    });
    if (!response.ok)
        return null;
    return yield response.json();
});
exports.addTodo = addTodo;
const editTitle = (id, title) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${url}/${id}`, {
        method: "PATCH",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({ title }),
    });
    if (!response.ok)
        return null;
    return yield response.json();
});
exports.editTitle = editTitle;
const toggleStatus = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const findResponse = yield fetch(`${url}/${id}`);
    if (!findResponse.ok)
        return null;
    const { isCompleted: completed } = yield findResponse.json();
    const toggleResponse = yield fetch(`${url}/${id}`, {
        method: "PATCH",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({ completed: !completed })
    });
    if (!toggleResponse.ok)
        return null;
    return yield toggleResponse.json();
});
exports.toggleStatus = toggleStatus;
const deleteTodo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${url}/${id}`, { method: "DELETE" });
    return response.ok;
});
exports.deleteTodo = deleteTodo;
