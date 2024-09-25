import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { getNfts } from "../../../service/nft";
import toast from "react-hot-toast";

const initialState = {
  loading: true,
  loadMoreLoading: false,
  items: [],
  paginationData: {
    hasMore: false,
    totalCount: 0,
  },
};

export const nftsSlice = createSlice({
  name: "nfts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNftData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNftData.fulfilled, (state, action) => {
        const { nfts, ...paginationData } = action.payload;
        state.paginationData = paginationData;
        state.loading = false;
        state.items = nfts;
      })
      .addCase(getNftData.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getMoreNftData.pending, (state) => {
        state.loadMoreLoading = true;
      })
      .addCase(getMoreNftData.fulfilled, (state, action) => {
        const { nfts, ...paginationData } = action.payload;
        state.paginationData = paginationData;
        state.loadMoreLoading = false;
        state.items = [...state.items, ...nfts];
      });
  },
});

export const {} = nftsSlice.actions;

export const getMoreNftData = createAsyncThunk(
  "nfts/getMoreNftData",
  async (params) => {
    return await getNfts(params);
  }
);

export const getNftData = createAsyncThunk(
  "nfts/getNftData",
  async (params) => {
    return await getNfts(params);
  }
);

export const selectNftData = (state) => state.nfts;
export default nftsSlice.reducer;
