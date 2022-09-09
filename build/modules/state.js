"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.deleteTodo = exports.toggleCompleted = exports.editTitle = exports.createTodo = void 0;
const api = __importStar(require("./api/todos"));
const subscription_1 = require("./subscription");
let _todos;
const getTodos = () => __awaiter(void 0, void 0, void 0, function* () {
    if (_todos === undefined) {
        (0, subscription_1.subscribe)((ts) => _todos = ts);
        _todos = yield api.getTodos();
    }
    return _todos;
});
const createTodo = (title) => __awaiter(void 0, void 0, void 0, function* () {
    const newTodo = yield api.addTodo(title);
    if (newTodo === null)
        return;
    const todos = yield getTodos();
    const updated = [...todos, newTodo];
    (0, subscription_1.invoke)(updated);
});
exports.createTodo = createTodo;
const editTitle = (id, title) => __awaiter(void 0, void 0, void 0, function* () {
    const edited = yield api.editTitle(id, title);
    if (edited === null)
        return;
    const todos = yield getTodos();
    const updated = todos.map(t => t.id === edited.id ? edited : t);
    (0, subscription_1.invoke)(updated);
});
exports.editTitle = editTitle;
const toggleCompleted = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const edited = yield api.toggleStatus(id);
    if (edited === null)
        return;
    const todos = yield getTodos();
    const updated = todos.map(t => t.id === edited.id ? edited : t);
    (0, subscription_1.invoke)(updated);
});
exports.toggleCompleted = toggleCompleted;
const deleteTodo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isDeleted = yield api.deleteTodo(id);
    if (!isDeleted)
        return;
    const todos = yield getTodos();
    const removed = todos.filter(t => t.id !== id);
    (0, subscription_1.invoke)(removed);
});
exports.deleteTodo = deleteTodo;
