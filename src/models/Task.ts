/**
 * Represents a single Task with an associated Category.
 */
export interface Task {
    id: string; //UUID
    title: string;
    description?: string;
    due_date?: string;
    created_date: string;
    status: number; // 0 = Incomplete, 1 = Complete
    category_id?: string; //UUID
}

export type CreateTaskDto = Omit<Task, "id" | "created_date">;
export type UpdateTaskDto = Partial<Omit<Task, "id" | "created_date">>;