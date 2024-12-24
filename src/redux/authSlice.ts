import { createSlice } from '@reduxjs/toolkit';
// console.log('createslice-->', createSlice);

const initialState = {
    isAuthenticated: false,
    email: '',
    password: '',
    error: null,
};
// console.log('initialstate-->', initialState);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials(state, action) {
            state.email = action.payload.email;
            // console.log('email-->', state.email)

            state.password = action.payload.password;
            // console.log('pass-->', state.password)
        },

        setAuthState(state, action) {
            state.isAuthenticated = action.payload.isAuthenticated;
        },

        setError(state, action) {
            state.error = action.payload;
        },

        logout(state) {
            state.isAuthenticated = false;
            state.email = '';
            state.password = '';
        },
    },
});

export const { setCredentials, setAuthState, setError, logout } = authSlice.actions;
export default authSlice.reducer;



