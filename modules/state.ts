import { Todo } from "./types.js";
import * as api from "./api/todos.js";
import { subscribe, invoke } from "./subscription.js";

const _isEditing = new Set<number>();

let _todos: readonly Todo[] | undefined;

const getTodos = async () => {
    if (_todos === undefined) {
        subscribe((ts) => _todos = ts);
        _todos = await api.getTodos();
    }

    return _todos as readonly Todo[];
};

export const init = async () => {
    const todos = await getTodos();
    
    invoke(todos, _isEditing);
}

export const createTodo = async (title: string) => {
    const newTodo = await api.addTodo(title);
    if (newTodo === null) return;

    const todos = await getTodos();
    const updated = [...todos, newTodo];

    invoke(updated, _isEditing);
};


export const editTitle = async (id: number, title: string) => {
    const edited = await api.editTitle(id, title);
    if (edited === null) return;

    const todos = await getTodos();
    const updated = todos.map(t => t.id === edited.id ? edited : t);

    _isEditing.delete(id);

    invoke(updated, _isEditing);
};

export const startEdit = async (id: number) => {
    const todos = await getTodos();

    _isEditing.add(id);

    invoke(todos, _isEditing);
};

export const toggleCompleted = async (id: number) => {
    const edited = await api.toggleStatus(id);
    if (edited === null) return;

    const todos = await getTodos();
    const updated = todos.map(t => t.id === edited.id ? edited : t);

    _isEditing.delete(id);

    invoke(updated, _isEditing);
};

export const deleteTodo = async (id: number) => {
    const isDeleted = await api.deleteTodo(id);
    if (!isDeleted) return;

    const todos = await getTodos();
    const removed = todos.filter(t => t.id !== id);

    _isEditing.delete(id);

    invoke(removed, _isEditing);
};
