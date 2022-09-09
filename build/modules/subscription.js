"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invoke = exports.unsubscribe = exports.subscribe = void 0;
let subscriptions = [];
const subscribe = (listener) => {
    subscriptions.push(listener);
    return subscriptions.length - 1;
};
exports.subscribe = subscribe;
const unsubscribe = (id) => {
    subscriptions.splice(id, 1);
};
exports.unsubscribe = unsubscribe;
const invoke = (todos) => {
    subscriptions.forEach(s => s(todos));
};
exports.invoke = invoke;
