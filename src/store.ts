import { configureStore } from "@reduxjs/toolkit";
import tasksReducer, { TasksState } from "./tasks/tasks-slice";
import usersSlice, { UsersState } from "./users/users-slice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    users: usersSlice,
  },
});

export type RootState = {
  tasks: TasksState;
  users: UsersState;
};
export type AppDispatch = typeof store.dispatch;
