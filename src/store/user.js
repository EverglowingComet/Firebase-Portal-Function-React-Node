import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        value: null,
        logginIn: false, 
    },

    reducers: {
        setAuth: (state, action) => {
            state.value = action.payload;
        },
        clearAuth: (state) => {
            state.value = null;
        },
        toggleLogginIn: (state, action) => {
            state.logginIn = action.payload;
        },
    }
});

export const { setAuth, clearAuth, toggleLogginIn } = userSlice.actions;
export default userSlice.reducer;