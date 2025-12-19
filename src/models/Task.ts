/**
 * Represents a single Task with an associated Category.
 */
export interface Task {
    id: string; //UUID
    title: string;
    description: string;
    due_date: string;
    created_date: string;
    status: number; // 0 = Incomplete, 1 = Complete
    category_id: string; //UUID
}