import { createSlice } from "@reduxjs/toolkit";





const init = {
    theme: localStorage.getItem("theme") ? localStorage.getItem("theme") : 'light'
}
const ThemeSlice = createSlice({
    name: "Theme",
    initialState: init,
    reducers: {
        setTheme: (state, action) => {
            state.theme = action.payload;
        }
    }
})

export const { setTheme } = ThemeSlice.actions
export default ThemeSlice.reducer