import { createSlice } from '@reduxjs/toolkit';
console.log('createslice-->', createSlice);

const initialState = {
    isAuthenticated: false,
    email: '',
    password: '',
    error: null,
};
console.log('initialstate-->', initialState);



