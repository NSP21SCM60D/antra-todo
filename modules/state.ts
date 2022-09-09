import { Todo } from "./types";
import * as api from "./api/todos";
import { subscribe, invoke } from "./subscription";

let _todos: readonly Todo[] | undefined;

const getTodos = async () => {
    if (_todos === undefined) {
        subscribe((ts) => _todos = ts);
        _todos = await api.getTodos();
    }

    return _todos as readonly Todo[];
};

export const createTodo = async (title: string) => {
    const newTodo = await api.addTodo(title);
    if (newTodo === null) return;

    const todos = await getTodos();
    const updated = [...todos, newTodo];

    invoke(updated);
};


export const editTitle = async (id: number, title: string) => {
    const edited = await api.editTitle(id, title);
    if (edited === null) return;

    const todos = await getTodos();
    const updated = todos.map(t => t.id === edited.id ? edited : t);

    invoke(updated);
};

export const toggleCompleted = async (id: number) => {
    const edited = await api.toggleStatus(id);
    if (edited === null) return;

    const todos = await getTodos();
    const updated = todos.map(t => t.id === edited.id ? edited : t);

    invoke(updated);
};

export const deleteTodo = async (id: number) => {
    const isDeleted = await api.deleteTodo(id);
    if (!isDeleted) return;

    const todos = await getTodos();
    const removed = todos.filter(t => t.id !== id);

    invoke(removed);
};
