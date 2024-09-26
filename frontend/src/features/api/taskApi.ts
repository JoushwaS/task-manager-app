// src/features/api/taskApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreateTaskDto, Task, UpdateTaskDto } from "../../types/task";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void>({
      query: () => "/tasks",
      providesTags: ["Tasks"],
    }),
    addTask: builder.mutation<Task, CreateTaskDto>({
      query: (newTask) => ({
        url: "/tasks",
        method: "POST",
        body: newTask,
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateTask: builder.mutation<Task, UpdateTaskDto & { id: number }>({
      query: ({ id, ...updatedTask }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: updatedTask,
      }),
      invalidatesTags: ["Tasks"],
    }),
    deleteTask: builder.mutation<void, number>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApi;
