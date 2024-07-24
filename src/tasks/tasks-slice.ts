import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Task } from "../types";

export interface TasksState {
  tasks: Task[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  status: "idle",
  error: null,
};

// Define the async thunk for fetching tasks
export const fetchTasks = createAsyncThunk<Task[], void, { state: RootState }>(
  "tasks/fetchTasks",
  async (_, thunkAPI) => {
    const response = await fetch("/api/tasks");
    if (!response.ok) {
      return thunkAPI.rejectWithValue("Failed to fetch tasks");
    }
    const data = await response.json();
    return data;
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // Add any synchronous reducers here
    deleteTask: (state, actions) => {
      state.tasks = state.tasks.filter(
        (task) => task.taskId !== actions.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch tasks";
      });
  },
});

export const { deleteTask } = tasksSlice.actions;

export default tasksSlice.reducer;
