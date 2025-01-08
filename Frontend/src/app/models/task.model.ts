export interface Task {
    title: string;
    description: string;
    creationDate: Date;
    completed: boolean;
    isEditing?: boolean;
}
