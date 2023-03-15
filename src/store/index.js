import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./auth/authSlice"
import profileReducer from "./profileSlice"  
import themeReducer from "./theme"  
import searchReducer from "./search"  
const store = configureStore({
    reducer:{Auth:AuthReducer,profile:profileReducer,theme:themeReducer,search:searchReducer}
})

export default store