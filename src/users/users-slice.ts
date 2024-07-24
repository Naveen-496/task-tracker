import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { User } from "../types";

export interface UsersState {
  users: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  status: "idle",
  error: null,
};

export const fetchUsers = createAsyncThunk<User[], void, { state: RootState }>(
  "users/fetchUsers",
  async (_, thunkAPI) => {
    const response = await fetch("/api/tasks");
    if (!response.ok) {
      return thunkAPI.rejectWithValue("Failed to fetch tasks");
    }
    const data = await response.json();
    return data;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchUsers.rejected, (state) => {
      state.status = "failed";
      state.error = "Error fetching users";
    });
    builder.addCase(fetchUsers.fulfilled, (state, actions) => {
      state.users = actions.payload;
    });
  },
});

export default usersSlice.reducer;
