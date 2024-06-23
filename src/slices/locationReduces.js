import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    wasUpdated: false
};

export const locationSlice = createSlice({
    name: "location",
    initialState: initialState,
    reducers: {
        updateLocation: (state, action) => {
            state.wasUpdated = true;
        }
    }
});

export const {updateLocation} = locationSlice.actions;
export default locationSlice.reducer;