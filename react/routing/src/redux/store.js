import { configureStore } from "@reduxjs/toolkit";
import nftsReducer from "./features/nftsSlice";
import creatorsReducer from "./features/creatorsSlice";

export const store = configureStore({
  reducer: {
    nfts: nftsReducer,
    creators: creatorsReducer,
  },
});
