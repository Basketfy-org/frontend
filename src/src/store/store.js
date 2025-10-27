// src/store/store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

const globalSlice = createSlice({
    name: 'global',
    initialState: {
        isDarkMode: false,
        walletConnected: false,
        walletAddress: '',
        formattedAddress: '',
    },
    reducers: {
        setDarkMode(state, action) {
            state.isDarkMode = action.payload;
        },
        toggleDarkMode(state) {
            state.isDarkMode = !state.isDarkMode;
        },
        setWalletConnected(state, action) {
            state.walletConnected = action.payload;
        },
        setWalletAddress(state, action) {
            state.walletAddress = action.payload;
        },
        setFormattedAddress(state, action) {
        
                state.formattedAddress = action.payload
        },
        resetWallet(state) {
            // Optional helper to clear wallet info
            state.walletConnected = false;
            state.walletAddress = '';
            state.formattedAddress = '';
        },
    },
});

export const {
    setDarkMode,
    toggleDarkMode,
    setWalletConnected,
    setWalletAddress,
    setFormattedAddress,
    resetWallet,
} = globalSlice.actions;

export const store = configureStore({
    reducer: {
        global: globalSlice.reducer,
    },
});
