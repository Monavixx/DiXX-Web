import { configureStore } from "@reduxjs/toolkit";
import userSlice from './slices/userSlice.ts';
import locationSlice from "./slices/locationSlice.ts";

export const store = configureStore({
    reducer: {
      user: userSlice,
      location: locationSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;