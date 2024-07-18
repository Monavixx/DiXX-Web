import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import { get_request_json, post_request_json } from '../functions/send_request.ts';

export type TLoginRequest = {username:string,password:string};
export type TLoginResponse = {data:{email:string, username:string}};
export type TSignUpRequest = {username:string, email:string, password:string};
export type TSignUpError = string[];
export type TSignUpErrors = {
    username: TSignUpError,
    email: TSignUpError,
    password: TSignUpError
};
export type TSignUpResponse = {errors:TSignUpErrors}

export interface IInitialUserState {
    name:string,
    email:string,
    is_authenticated:boolean,
    is_pending:boolean,
    signUp: {
        errors: TSignUpErrors,
        is_pending:boolean,
        success:boolean
    },
    regenerateToken: {
        is_pending: boolean
    }
};

const initialUserState:IInitialUserState = {  
    name:"anonymous",
    email:"",
    is_authenticated:false,
    is_pending:true,
    signUp: {
        errors:{
            username: [],
            email: [],
            password: []
        },
        is_pending: false,
        success: false
    },
    regenerateToken: {is_pending: false}
};




const checkIfLoggedIn = createAsyncThunk('user/checkIfLoggedIn', async (_, thunkAPI) => {
    if(localStorage.getItem('token') === null) {
        throw Error('You do not have a token');
    }
    const [data, status] = await get_request_json('login/', thunkAPI.dispatch);
    if(status === 200) {
        return data;
    }
    else {
        throw Error(`status: ${status}`);
    }
});


const logIn = createAsyncThunk('user/logIn', async ({username, password}:TLoginRequest, thunkAPI) => {
    const [data, status] = await post_request_json('login/', thunkAPI.dispatch, {username:username, password:password});

    if(status === 200) {
        localStorage.setItem('token', data.data.token);
        return data;
    }
    else {
        return thunkAPI.rejectWithValue({data, status});
    }
});


const regenerateToken = createAsyncThunk('user/regenerateToken', async(_,thunkAPI)=> {
    const [data,status] = await get_request_json('regenerate-token/', thunkAPI.dispatch);
    if(status === 200) {
      localStorage.setItem('token', data.data.token);
    }
    return {data,status};
});


const signUp = createAsyncThunk<void, TSignUpRequest, {rejectValue: TSignUpResponse}>(
    'user/signUp', async ({username, email, password}:TSignUpRequest, thunkAPI) => {

    const [data, status] = await post_request_json('signup/',thunkAPI.dispatch, {
        username: username,
        email: email,
        password: password
    });

    if(status === 201) {
        return;
    }
    else {
        return thunkAPI.rejectWithValue(data);
    }
});



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
        logoutAction: (state)=>{
            localStorage.removeItem('token');
            state.name = initialUserState.name;
            state.email = initialUserState.email;
            state.is_authenticated = false;
            state.is_pending = false;
        },
        pending: (state, action)=>{
            state.is_pending = Boolean(action.payload);
        },
        initSignUp: (state) => {
            state.signUp.errors = initialUserState.signUp.errors;
            state.signUp.success = initialUserState.signUp.success;
        }
    },
    extraReducers: (builder) => {
        builder
        // checkIfLoggedIn
        .addCase(checkIfLoggedIn.pending, (state) => {
            state.is_pending = true;
        })
        .addCase(checkIfLoggedIn.fulfilled, (state, action: PayloadAction<TLoginResponse>) => {
            state.is_pending = false;
            state.is_authenticated = true;
            state.email = action.payload.data.email;
            state.name = action.payload.data.username;
        })
        .addCase(checkIfLoggedIn.rejected, (state) => {
            state.is_pending = false;
            state.is_authenticated = false;
            state.name = initialUserState.name;
            state.email = initialUserState.email;
        })

        // logIn
        .addCase(logIn.pending, (state) => {
            state.is_pending = true;
        })
        .addCase(logIn.fulfilled, (state, action: PayloadAction<TLoginResponse>) => {
            state.is_pending = false;
            state.is_authenticated = true;
            state.email = action.payload.data.email;
            state.name = action.payload.data.username;
            
        })
        .addCase(logIn.rejected, (state) => {
            state.is_pending = false;
            state.is_authenticated = false;
            state.name = initialUserState.name;
            state.email = initialUserState.email;

        })

        // regenerateToken
        .addCase(regenerateToken.pending, (state)=> {
            state.regenerateToken.is_pending = true;
        })
        .addCase(regenerateToken.fulfilled, (state)=> {
            state.regenerateToken.is_pending = false;
        })
        .addCase(regenerateToken.rejected, (state)=>{
            state.regenerateToken.is_pending=false;
        })

        // signUp
        .addCase(signUp.pending, (state) => {
            state.signUp.is_pending = true;
        })
        .addCase(signUp.fulfilled, (state) => {
            state.signUp.is_pending = false;
            state.signUp.success = true;
        })
        .addCase(signUp.rejected, (state, action) => {
            state.signUp.is_pending = false;
            state.signUp.errors.email = action.payload!.errors.email || [];
            state.signUp.errors.username = action.payload!.errors.username || [];
            state.signUp.errors.password = action.payload!.errors.password || [];
            state.signUp.success = false;
        })
    }
});


export const UserActions = {
    ...userSlice.actions,
    checkIfLoggedIn,
    logIn,
    regenerateToken,
    signUp
};

export default userSlice.reducer;
