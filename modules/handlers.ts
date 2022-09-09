import { Todo } from "./types.js";
import * as model from "./state.js";

export const onTodoSubmit = async (event: SubmitEvent) => {
    if (!(event.target instanceof HTMLFormElement)) return;

    event.preventDefault();

    const title: string = event.target.todo?.value ?? "";
    if (!title) return;

    await model.createTodo(title);

    event.target.todo.value = "";
};

export const onTodoClick = async (event: Event) => {
    if (!(event.target instanceof HTMLElement)) return;

    console.log("got click", event.target);

    const { dataset: { type }, parentElement: parent } = event.target;
    const id = parent?.dataset.id;

    if (id === undefined) return;

    switch (type) {
        case "edit":
            const input = parent?.getElementsByTagName("input").namedItem("todo") ?? null;
            await onEditClick(id, input);
            break;

        case "delete":
            await onDeleteClick(id);
            break;

        case "toggle":
            await onToggleCompleted(id);
            break;
    }
};

const onEditClick = async (id: string, input: HTMLInputElement | null) => {
    const todo = parseInt(id);
    if (isNaN(todo)) return;

    const isStartingEdit = input === null;

    if (isStartingEdit) {
        await model.startEdit(todo);
        return;
    }

    const title = input.value;

    await model.editTitle(todo, title);
};

const onDeleteClick = async (id: string) => {
    const todo = parseInt(id);
    if (isNaN(todo)) return;

    await model.deleteTodo(todo);
};

const onToggleCompleted = async (id: string) => {
    const todo = parseInt(id);
    if (isNaN(todo)) return;

    await model.toggleCompleted(todo);
};

const pendingListItem = ({ id, title }: Todo, isEditing: ReadonlySet<number>) => {
    const text = isEditing.has(id)
        ? `<input type="text" value="${title}"/>`
        : `<p>${title}</p>`;

    return `
        <li data-id="${id}">
            ${text}
            <button data-type="edit" type="button">
                <img src="./assets/edit.svg" alt="Edit" />
            </button>

            <button data-type="delete" type="button">
                <img src="./assets/delete.svg" alt="Delete" />
            </button>

            <button data-type="toggle" type="button">
                <img src="./assets/right.svg" alt="Right Arrow" />
            </button>
        </li>`;
}

const completedListItem = ({ id, title }: Todo, isEditing: ReadonlySet<number>) => {
    const text = isEditing.has(id)
        ? `<input type="text" value="${title}"/>`
        : `<p>${title}</p>`;

    return `
        <li data-id="${id}">
            <button data-type="toggle" type="button">
                <img src="./assets/left.svg" alt="Left Arrow" />
            </button>
            ${text}
            <button data-type="edit" type="button">
                <img src="./assets/edit.svg" alt="Edit" />
            </button>
            <button data-type="delete" type="button">
                <img src="./assets/delete.svg" alt="Delete" />
            </button>
        </li>`;
};

export const createRenderer = (pending: HTMLOListElement, completed: HTMLOListElement) => {
    return (todos: readonly Todo[], isEditing: ReadonlySet<number>) => {
        const pendingItems = todos
            .filter(t => !t.isCompleted)
            .map(t => pendingListItem(t, isEditing));

        const completedItems = todos
            .filter(t => t.isCompleted)
            .map(t => completedListItem(t, isEditing));

        pending.innerHTML = pendingItems.join('\n');
        completed.innerHTML = completedItems.join('\n');
    };
};
