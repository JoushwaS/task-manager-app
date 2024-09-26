// src/features/tasks/taskSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TaskState {
  selectedTaskId: number | null;
}

const initialState: TaskState = {
  selectedTaskId: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    selectTask(state, action: PayloadAction<number>) {
      state.selectedTaskId = action.payload;
    },
    clearSelectedTask(state) {
      state.selectedTaskId = null;
    },
  },
});

export const { selectTask, clearSelectedTask } = taskSlice.actions;
export default taskSlice.reducer;
