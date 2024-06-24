import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    wasUpdated: false,
    pathname:'',
    navigatePathname:''
};

export const locationSlice = createSlice({
    name: "location",
    initialState: initialState,
    reducers: {
        updateLocation: (state, action) => {
            state.wasUpdated = true;
            state.pathname = action.payload;
        },
        navigateAction: (state, action) => {
            state.pathname = action.payload;
            state.navigatePathname = action.payload;
            state.wasUpdated = true;
        }
    }
});

export const {updateLocation, navigateAction} = locationSlice.actions;
export default locationSlice.reducer;