import * as model from "./state.js";

export const onTodoSubmit = async (event: SubmitEvent) => {
    if (!(event.target instanceof HTMLFormElement)) return;

    event.preventDefault();

    const title: string = event.target.todo?.value ?? "";
    if (!title) return;

    await model.createTodo(title);

    event.target.todo.value = "";
};

export const onFilterSubmit = (event: SubmitEvent) => {
    if (!(event.target instanceof HTMLFormElement)) return;

    event.preventDefault();

    const filter: string | null = event.target.filter?.value ?? null;
    if (!filter) return;

    model.setFilter(filter);
};

export const onEditEnter = async (event: KeyboardEvent) => {
    if (event.key !== "Enter") return;

    event.stopPropagation();

    const input = document.activeElement;

    if (!(input instanceof HTMLInputElement)) return;

    const parent = input.parentElement;

    if (!(parent instanceof HTMLLIElement)) return;

    const id = parent.dataset.id;
    if (id === undefined) return;

    const todo = parseInt(id);
    const title = input.value;

    if (isNaN(todo)) return;

    await model.editTitle(todo, title);
};

export const onTodoClick = async (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!(event.target instanceof HTMLElement)) return;

    const button = getButton(event.target);
    if (button === null) return;

    const { dataset: { type }, parentElement: parent } = button;
    const id = parent?.dataset.id;

    if (id === undefined) return;

    switch (type) {
        case "edit":
            const title = parent?.getElementsByTagName("input").item(0)?.value;
            await onEditClick(id, title ?? null);
            break;

        case "delete":
            await onDeleteClick(id);
            break;

        case "toggle":
            await onToggleCompleted(id);
            break;

        default:
            break;
    }
};

const getButton = (elem: HTMLElement) => {
    let check: HTMLElement | null = elem;

    while (check && !(check instanceof HTMLButtonElement)) {
        check = check.parentElement;
    }

    return check;
};

const onEditClick = async (id: string, title: string | null) => {
    const todo = parseInt(id);
    if (isNaN(todo)) return;

    if (title === null) {
        await model.startEdit(todo);
    } else {
        await model.editTitle(todo, title);
    }
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
