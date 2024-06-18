import {createSlice} from '@reduxjs/toolkit';


const initialUserState = {  
    name:"anonymous",
    email:"",
    is_authenticated:false,
    is_pending:true
};

export const userSlice = createSlice({
    name:"user",
    initialState: initialUserState,
    reducers: {
        loginAction: (state, action)=> {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.is_authenticated = true;
            state.is_pending = false;
        },
        logoutAction: (state, action)=>{
            state.name = initialUserState.name;
            state.email = initialUserState.email;
            state.is_authenticated = false;
            state.is_pending = false;
        },
        pendingFalse: (state, action)=>{
            state.is_pending = false;
        }
    }
});

export const { loginAction, logoutAction, pendingFalse } = userSlice.actions;
export default userSlice.reducer;