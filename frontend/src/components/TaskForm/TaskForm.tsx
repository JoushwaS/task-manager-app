// src/components/TaskForm.tsx
import React, { useState } from "react";
import { useAddTaskMutation } from "../../features/api/taskApi";
// import { useAddTaskMutation } from "../features/api/taskApi";

const TaskForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [addTask] = useAddTaskMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title && description) {
      await addTask({ title, description });
      setTitle("");
      setDescription("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 mb-2 w-full"
        required
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 mb-2 w-full"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
