let subscriptions = [];
export const subscribe = (listener) => {
    subscriptions.push(listener);
    return subscriptions.length - 1;
};
export const unsubscribe = (id) => {
    subscriptions.splice(id, 1);
};
export const invoke = (todos, isEditing) => {
    subscriptions.forEach(s => s(todos, isEditing));
};
