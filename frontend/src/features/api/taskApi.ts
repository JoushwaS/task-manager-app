import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreateTaskDto, Task, UpdateTaskDto } from "../../types/task";
// Define a type for the query parameters
interface GetTasksQueryParams {
  status?: string; // 'pending' or 'completed'
  order?: "asc" | "desc";
}
export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.BASE_URL }),
  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], GetTasksQueryParams>({
      query: ({ status, order }) => {
        // Create a query string based on the parameters
        const params = new URLSearchParams();
        if (status) params.append("status", status);
        if (order) params.append("order", order);

        return `/tasks?${params.toString()}`;
      },
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
