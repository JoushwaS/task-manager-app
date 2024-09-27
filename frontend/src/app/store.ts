import { configureStore } from "@reduxjs/toolkit";
import { taskApi } from "../features/api/taskApi";
// import { taskApi } from "../features/api/taskApi";
import taskReducer from "../features/tasks/taskSlice";

export const store = configureStore({
  reducer: {
    [taskApi.reducerPath]: taskApi.reducer,
    tasks: taskReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(taskApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
