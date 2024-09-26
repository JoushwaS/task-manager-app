import React, { useState } from "react";
import { useGetTasksQuery } from "../features/api/taskApi";
import TaskItem from "./TaskItem";
import LoadingSpinner from "./LoadingSpinner"; // Import the LoadingSpinner

const TaskList: React.FC = () => {
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [order, setOrder] = useState<"asc" | "desc" | undefined>(undefined);

  const { data: tasks, isLoading } = useGetTasksQuery({ status, order });

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value === "all" ? undefined : e.target.value);
  };

  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrder(e.target.value === "none" ? undefined : e.target.value);
  };

  return (
    <div className="mt-4">
      {/* Filter and Sort Dropdowns */}
      <div className="flex justify-between mb-4">
        <div>
          <label htmlFor="status" className="mr-2">
            Filter by Status:
          </label>
          <select
            id="status"
            onChange={handleStatusChange}
            className="p-2 border rounded-md"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <label htmlFor="sort" className="mr-2">
            Sort by:
          </label>
          <select
            id="sort"
            onChange={handleOrderChange}
            className="p-2 border rounded-md"
            defaultValue={"asc"}
          >
            <option value="none">Select Order</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {/* Show loading spinner */}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="task-list">
          {tasks?.length ? (
            tasks.map((task) => <TaskItem key={task.id} task={task} />)
          ) : (
            <p>No tasks available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskList;
