const createRenderer = (pending, completed) => {
    return (todos, isEditing, filter) => {
        const pendingItems = todos
            .filter((t) => !t.completed)
            .filter((t) => !filter || t.title.includes(filter))
            .map((t) => pendingListItem(t, isEditing));
        const completedItems = todos
            .filter((t) => t.completed)
            .filter((t) => !filter || t.title.includes(filter))
            .map((t) => completedListItem(t, isEditing));
        pending.innerHTML = pendingItems.join("\n");
        completed.innerHTML = completedItems.join("\n");
    };
};
export default createRenderer;
const pendingListItem = ({ id, title }, isEditing) => {
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
};
const completedListItem = ({ id, title }, isEditing) => {
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
