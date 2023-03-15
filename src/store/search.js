import { createSlice } from "@reduxjs/toolkit";





const init = {
    Search:null
}
const SearchSlice = createSlice({
    name: "Search",
    initialState: init,
    reducers: {
        setSearch: (state, action) => {
            state.Search = action.payload;
        }
    }
})

export const { setSearch } = SearchSlice.actions
export default SearchSlice.reducer