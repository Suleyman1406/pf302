import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  number: 0,
  isLoading: false,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.number += 1;
    },
    decrement: (state) => {
      state.number -= 1;
    },
    reset: (state) => {
      state.number = 0;
    },
    changeByValue: (state, action) => {
      state.number += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changeByValueAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeByValueAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.number += action.payload;
      });
  },
});

export const changeByValueAsync = createAsyncThunk(
  "counter/changeByValueAsync",
  async (value) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return value;
  }
);

export const { increment, decrement, reset, changeByValue } =
  counterSlice.actions;
export const selectCounter = (state) => state.counter;

export default counterSlice.reducer;
