const _subscriptions = [];
export const subscribe = (listener) => {
    _subscriptions.push(listener);
    return _subscriptions.length - 1;
};
export const unsubscribe = (id) => {
    _subscriptions.splice(id, 1);
};
export const invoke = (todos, isEditing) => {
    for (const sub of _subscriptions) {
        setTimeout(() => sub(todos, isEditing));
    }
};
