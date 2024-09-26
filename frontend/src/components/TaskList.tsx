// src/components/TaskList.tsx
import React from "react";
import { useGetTasksQuery } from "../features/api/taskApi";
import TaskItem from "./TaskItem";

const TaskList: React.FC = () => {
  const { data: tasks, isLoading } = useGetTasksQuery();

  if (isLoading) return <p>Loading tasks...</p>;

  return (
    <div className="task-list">
      {tasks?.length ? (
        tasks.map((task) => <TaskItem key={task.id} task={task} />)
      ) : (
        <p>No tasks available.</p>
      )}
    </div>
  );
};

export default TaskList;
