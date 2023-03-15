import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ImSpinner2 } from 'react-icons/im'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUserId } from '../store/profileSlice'

const Search = () => {
    const { Search } = useSelector(state => state.search)
    const [users, setusers] = useState([]);
    const { config, user } = useSelector(state => state.Auth)
    const [loading, setloading] = useState();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const getSugUsers = async () => {
        setloading(true)
        const response = await axios.get('https://socialmediamernapp.onrender.com/api/user/get-sug-users', config)
        const data = response.data.users
        setusers(data)
        setloading(false)
    }

    const searchUsers = async () => {
        setusers([])
        setloading(true)
        const response = await axios.get('https://socialmediamernapp.onrender.com/api/user/search-users/' + Search)
        const data = response.data.users
        setusers(data)
        setloading(false)
    }

    useEffect(() => {
        getSugUsers()
    }, []);

    useEffect(() => {

        Search != null && searchUsers()
    }, [Search]);

    const toggleFollowUser = async (userId, eo) => {

        eo.target.value = 'Loading...'
        const res = await axios.post(`https://socialmediamernapp.onrender.com/api/user/follow-user/${userId}`, "", config)
        res.data.message == 'user unfollowed' ? eo.target.value = 'Follow' : eo.target.value = 'unFollow'
    }
    const gotoProfile = (id) => {
        dispatch(setUserId(id))
        navigate('/profile')
    }
    return (

        <div className=' h-fit  bg-white dark:bg-[#0b1120] cursor-pointer  w-[97%] sm:w-[90%] max-w-7xl p-5 mx-auto rounded-lg  pb-20 mt-5'>


            {users.map(e => e._id != user._id && <div onClick={(eo)=>eo.target.id!='not'&&gotoProfile(e._id)} key={Math.random()} className=' w-full flex justify-between items-center  p-2 max-w-xl mx-auto my-10 dark:bg-slate-800 bg-white rounded-md'>

                <div className=' flex items-center  w-fit'>
                    <img src={e.profileImage} className=' rounded-lg w-20 h-20' alt="" />
                    <span className='  font-bold  text-md sm:text-xl dark:text-white tracking-[2px]   mx-3'>{e.username}</span>
                </div>

                <input type='button' id='not' className='  text-white rigsm:scale-100 scale-[88%]  bg-sky-600 px-4 py-1 rounded-md text-whtie hover:bg-sky-700' onClick={(eo) => { toggleFollowUser(e._id, eo) }} value={e.Followers.includes(user._id) ? 'unFollow' : 'Follow'} />



            </div>)}
            {loading && <ImSpinner2 className=' animate-spin text-sky-600 mx-auto mt-10' size='35' />}



        </div>
    )
}

export default Search