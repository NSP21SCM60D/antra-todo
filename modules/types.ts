export interface Todo {
    readonly id: number;
    readonly title: string;
    readonly completed: boolean;
}

export type TodoChange = (
    todos: readonly Todo[],
    isEditing: ReadonlySet<number>,
    filter: string | null,
) => void;
