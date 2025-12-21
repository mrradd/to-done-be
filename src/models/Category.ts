/**
 * Represents a Category for Tasks.
 */
export interface Category {
    id: string; //UUID
    name: string;
}

export type CreateCategoryDto = Omit<Category, "id">;