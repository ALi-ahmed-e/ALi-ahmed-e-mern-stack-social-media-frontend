import { createSlice } from "@reduxjs/toolkit";





const init = {
    userId: null
}
const ProfileSlice = createSlice({
    name: "Profile",
    initialState: init,
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload;
        }
    }
})

export const {setUserId } = ProfileSlice.actions
export default ProfileSlice.reducer