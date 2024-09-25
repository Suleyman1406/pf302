import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { getCreators } from "../../../service/creator";

const initialState = {
  loading: true,
  items: [],
};

export const creatorsSlice = createSlice({
  name: "creators",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCreatorsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCreatorsData.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      });
  },
});

export const {} = creatorsSlice.actions;

export const getCreatorsData = createAsyncThunk(
  "nfts/getCreatorsData",
  async () => {
    return await getCreators();
  }
);

export const selectCreatorData = (state) => state.creators;
export default creatorsSlice.reducer;
