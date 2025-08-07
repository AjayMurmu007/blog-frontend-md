import { createSlice } from "@reduxjs/toolkit";

// const isTokenPresentInCookies = () => {
//     const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
//     return token ? true : false;
// }

const loadUserFromLocalStorage = () => {
    try {
        // if (!isTokenPresentInCookies()) {
        //     return { user: null };
        // }
      
        const serializedState = localStorage.getItem('user');
        if (serializedState === null) {
            return { user: null };
        }
        return { user: JSON.parse(serializedState) };
    } catch (error) {
        return { user: null }
    }
}

const initialState = loadUserFromLocalStorage();

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            // console.log("payload:", action.payload);
            // console.log("Redux setUser called with:", action.payload.user);
            state.user = action.payload.user;
            // console.log(state.user)
            localStorage.setItem('user', JSON.stringify(state.user));
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('user');
        },
    },
})

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;