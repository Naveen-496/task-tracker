export type Task = {
  taskId: number;
  title: string;
  createdDate: string;
  assigneeId: number;
  assigneeName: string;
  priority: string;
  avatarUrl: string;
  isDone: boolean;
};

export type User = {
  id: number;
  name: string;
  email: string;
  avatarUrl: string;
};
