import { getCurrentUser, logout } from "@/services/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuth: (state) => {
      state.user = null;
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentUserAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getCurrentUserAsync.fulfilled, (state, action) => {
      state.user = action.payload.data.user;
      state.loading = false;
    });
    builder.addCase(getCurrentUserAsync.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(logoutAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logoutAsync.fulfilled, (state) => {
      state.user = null;
      state.loading = false;
    });
    builder.addCase(logoutAsync.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { clearAuth } = authSlice.actions;

export const getCurrentUserAsync = createAsyncThunk(
  "auth/getCurrentUser",
  async () => {
    return await getCurrentUser();
  }
);

export const logoutAsync = createAsyncThunk("auth/logout", async () => {
  await logout();
});

export const selectUser = (state) => state.auth;

export default authSlice.reducer;
