import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        ref: null,
        loggingIn: false,
    },
    reducers: {
        setLogginIn: (state, action) => {
            state.loggingIn = action.payload;
        },
        setUserRef: (state, action) => {
            state.ref = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const { setUserRef, setLogginIn, setUser } = userSlice.actions;
export default userSlice.reducer;