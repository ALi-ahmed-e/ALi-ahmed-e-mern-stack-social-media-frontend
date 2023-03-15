import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const Api_url = `https://socialmediamernapp.onrender.com/api/auth`






//sign in

export const signIn = createAsyncThunk('auth/signin', async (userData, thunkapi) => {
    try {
        const res = await axios.post(Api_url + '/login', userData)
        localStorage.setItem('user', JSON.stringify(res.data))
        localStorage.setItem('token', res.data.token)
        return res.data

    } catch (error) {
        return thunkapi.rejectWithValue(error.response.data.message)

    }

})
//register
export const registeruser = createAsyncThunk('auth/register', async (userData, thunkapi) => {
    try {
        const res = await axios.post(Api_url + '/register', userData)
        localStorage.setItem('user', JSON.stringify(res.data))
        localStorage.setItem('token', res.data.token)
        return res.data

    } catch (error) {
        return thunkapi.rejectWithValue(error.response.data.message)

    }

})



const init = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : undefined,
    isLoading: false,
    token:localStorage.getItem('token') ,
    config: {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    },
    signError: null,
    regError: null,
}
const AuthSlice = createSlice({
    name: "auth",
    initialState: init,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        }
    }, extraReducers: (builder) => {

        builder.addCase(signIn.pending, (state, action) => {

            state.isLoading = true
        })
        builder.addCase(signIn.fulfilled, (state, action) => {

            state.isLoading = false
            state.user = action.payload
        })
        builder.addCase(signIn.rejected, (state, action) => {

            state.isLoading = false
            state.signError = action.payload
        })
        //register
        builder.addCase(registeruser.pending, (state, action) => {

            state.isLoading = true
        })
        builder.addCase(registeruser.fulfilled, (state, action) => {

            state.isLoading = false
            state.user = action.payload
        })
        builder.addCase(registeruser.rejected, (state, action) => {

            state.isLoading = false
            state.regError = action.payload
        })

    }
})

export const { setUser } = AuthSlice.actions
export default AuthSlice.reducer