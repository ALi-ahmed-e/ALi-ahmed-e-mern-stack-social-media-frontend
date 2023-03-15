import { createSlice } from "@reduxjs/toolkit";





const init = {
    posts: []
}
const PostsSlice = createSlice({
    name: "Posts",
    initialState: init,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
        }
    }
})

export const { setPosts } = PostsSlice.actions
export default PostsSlice.reducer