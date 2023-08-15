import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: {},
    teams: {},
    seasons: {},
}

export const commonSlice = createSlice({
    name: "common",
    initialState: {
        value: initialState
    },

    reducers: {
        updateUsers: (state, action) => {
            if (action.payload) {
                for (const [key, value] of Object.entries(action.payload)) {
                    state.value.users[key] = value;
                }
            }
        },
        clearUsers: (state) => {
            state.value.users = {};
        },
        updateTeams: (state, action) => {
            if (action.payload) {
                for (const [key, value] of Object.entries(action.payload)) {
                    state.value.teams[key] = value;
                }
            }
        },
        clearTeams: (state) => {
            state.value.teams = {};
        },
    }

});

export const { 
    updateUsers, 
    clearUsers, 
    updateTeams, 
    clearTeams 
} = commonSlice.actions;
export default commonSlice.reducer;