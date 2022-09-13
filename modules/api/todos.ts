import { Todo } from "../types.js";

const url = "http://localhost:3000/todos";

export const getTodos = async () => {
    const response = await fetch(url);
    if (!response.ok) return [];

    return await response.json() as readonly Todo[];
};

export const addTodo = async (title: string) => {
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({ title }),
    });

    if (!response.ok) return null;

    return await response.json() as Todo;
};

export const editTitle = async (id: number, title: string) => {
    const response = await fetch(`${url}/${id}`, {
        method: "PATCH",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({ title }),
    });

    if (!response.ok) return null;

    return await response.json() as Todo;
};

export const toggleStatus = async (id: number) => {
    const findResponse = await fetch(`${url}/${id}`);

    if (!findResponse.ok) return null;
    const { completed } = await findResponse.json() as Todo;

    const toggleResponse = await fetch(`${url}/${id}`, {
        method: "PATCH",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({ completed: !completed }),
    });

    if (!toggleResponse.ok) return null;

    return await toggleResponse.json() as Todo;
};

export const deleteTodo = async (id: number) => {
    const response = await fetch(`${url}/${id}`, { method: "DELETE" });
    return response.ok;
};
