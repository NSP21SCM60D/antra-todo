import * as api from "./api/todos.js";
import { Todo, TodoChange } from "./types.js";

const _todos: Todo[] = [];

let _filter: string | null = null;

const _isEditing = new Set<number>();

const _subscriptions = new Set<TodoChange>();

export const loadTodos = async () => {
    _todos.push(...await api.getTodos());

    invoke();
};

export const subscribe = (listener: TodoChange) => {
    _subscriptions.add(listener);

    return () => {
        _subscriptions.delete(listener);
    }
};

const invoke = () => {
    for (const sub of _subscriptions) {
        setTimeout(sub, 0, _todos, _isEditing, _filter);
    }
};

export const createTodo = async (title: string) => {
    const newTodo = await api.addTodo(title);
    if (newTodo === null) return;

    _todos.push(newTodo);

    invoke();
};

export const setFilter = (filter: string | null) => {
    _filter = filter;

    invoke();
};

export const editTitle = async (id: number, title: string) => {
    const edited = await api.editTitle(id, title);
    if (edited === null) return;

    const index = findIndex(id);
    if (index === null) return;

    _todos[index] = edited;
    _isEditing.delete(id);

    invoke();
};

export const startEdit = async (id: number) => {
    _isEditing.add(id);

    invoke();
};

export const toggleCompleted = async (id: number) => {
    const edited = await api.toggleStatus(id);
    if (edited === null) return;

    const index = findIndex(id);
    if (index === null) return;

    _todos[index] = edited;
    _isEditing.delete(id);

    invoke();
};

export const deleteTodo = async (id: number) => {
    const isDeleted = await api.deleteTodo(id);
    if (!isDeleted) return;

    const index = findIndex(id);
    if (index === null) return;

    _todos.splice(index, 1);
    _isEditing.delete(id);

    invoke();
};

const findIndex = (id: number) => {
    const initial = null as number | null;
    return _todos.reduce((idx, t, i) => t.id === id ? i : idx, initial);
};
