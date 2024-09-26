// src/components/TaskItem.tsx
import React from "react";
import {
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "../features/api/taskApi";
import { Task } from "../types/task";

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const handleStatusChange = async () => {
    await updateTask({
      id: task.id,
      status: task.status === "pending" ? "completed" : "pending",
    });
  };

  const handleDelete = async () => {
    await deleteTask(task.id);
  };

  return (
    <div className="task-item p-4 bg-gray-100 rounded mb-2 flex justify-between">
      <div>
        <h3 className="font-bold">{task.title}</h3>
        <p>{task.description}</p>
        <span className={`status ${task.status}`}>{task.status}</span>
        <span className="text-gray-500 text-sm">
          {new Date(task.createdAt).toLocaleString()}
        </span>
      </div>
      <div className="actions flex gap-2">
        <button
          onClick={handleStatusChange}
          className="bg-green-500 text-white py-1 px-2 rounded"
        >
          Toggle Status
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white py-1 px-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
