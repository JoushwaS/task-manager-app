// src/types/task.d.ts
export interface Task {
  id: number;
  title: string;
  description: string;
  status: "pending" | "completed" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskDto {
  title: string;
  description: string;
}

export interface UpdateTaskDto {
  status?: "pending" | "completed" | "cancelled";
  description?: string;
}
