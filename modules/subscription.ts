import { Todo } from "./types.js";

type TodoChange = (todos: readonly Todo[], isEditing: ReadonlySet<number>) => void;

let subscriptions: TodoChange[] = [];

export const subscribe = (listener: TodoChange) => {
    subscriptions.push(listener);
    return subscriptions.length - 1;
}

export const unsubscribe = (id: number) => {
    subscriptions.splice(id, 1);
}

export const invoke = (todos: readonly Todo[], isEditing: ReadonlySet<number>) => {
    subscriptions.forEach(s => s(todos, isEditing));
}