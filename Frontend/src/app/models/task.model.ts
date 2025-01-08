export interface Task {
  id?: string;
  title: string;
  description: string;
  creationDate: Date;
  completed: boolean;
  isEditing?: boolean;
  userId: string;
}
