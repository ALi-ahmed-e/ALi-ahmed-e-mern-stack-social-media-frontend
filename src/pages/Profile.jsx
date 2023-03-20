import React, { Fragment, useEffect, useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import PostsList from '../components/PostsList'







const Profile = ({ page }) => {
    const userdata = useSelector(state => state.Auth.user)
    const { config } = useSelector(state => state.Auth)
    const { userId } = useSelector(state => state.profile)
    const [user, setuserData] = useState();
    const [followed, setfollowed] = useState(user?.Followers.includes(userdata._id) ? true : false);
    const navigate = useNavigate()


    const getUserData = async () => {
        if (userId) {
            try {
                const res = await axios.get(`https://socialmediamernapp.onrender.com/api/user/get-user/${userId}`)
                setfollowed(res.data.Followers.includes(userdata._id) ? true : false)
                setuserData(res.data)
            } catch (error) {
                console.log(error)
                navigate('/home')
            }

        } else {
            navigate('/')
        }
    }

    useEffect(() => {
        getUserData()
    }, [userId])

    const toggleFollowUser = async () => {
        await axios.post(`https://socialmediamernapp.onrender.com/api/user/follow-user/${userId}`, "", config)
        setfollowed(!followed)

        getUserData()
    }



    return (
 
           <>

                <div className=' flex relative items-center  flex-col h-fit  bg-white dark:bg-[#0b1120]  w-[97%] sm:w-[90%] max-w-7xl p-5 mx-auto rounded-lg  pb-20 mt-20'>





                    {user ? <img src={user.profileImage} className=' h-32   w-32 self-center  rounded-full -mt-16  ' alt="user image" /> : <div className=' h-32   w-32 self-center bg-slate-200 dark:bg-slate-700 animate-pulse  rounded-full -mt-16  ' alt="user image" />}


                    {user ? <span className='  font-bold  text-3xl dark:text-white tracking-[2px]  mt-0 sm:mt-9'>{user.username}</span> : <div className='  font-bold  text-3xl bg-slate-200 dark:bg-slate-700 animate-pulse w-32 h-5 rounded-md   mt-4 sm:mt-9' />}


                    {user && <div className=" w-fit sm:absolute left-10 top-6">
                        <div className="flex justify-center py-4 lg:pt-4 pt-8">
                            <div className="mr-4 p-3 text-center">
                                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                    {user.Followers.length}

                                </span>
                                <span className="text-sm text-blueGray-400">Followers</span>
                            </div>
                            <div className="mr-4 p-3 text-center">
                                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                    {user.Following.length}
                                </span>
                                <span className="text-sm text-blueGray-400">Following</span>
                            </div>
                        </div>
                    </div>}

                    {user ? <button className=' absolute text-white right-[5px] sm:scale-100 scale-[88%] top-[5px] sm:right-10 sm:top-20 bg-sky-600 px-4 py-1 rounded-md text-whtie hover:bg-sky-700' onClick={() => { userdata._id == user._id ? navigate('/settings') : toggleFollowUser() }} >{userdata._id == user._id ? 'Edit' : followed ? 'unFollow' : 'Follow'}</button> : <div className=' absolute right-[5px] sm:scale-100 scale-[88%] top-[5px] sm:right-10 sm:top-20 bg-slate-200 dark:bg-slate-700 animate-pulse w-[58.81px] h-[32px] py-1 rounded-md text-whtie ' />}




                </div>



                <div className=' h-fit  bg-white dark:bg-[#0b1120]  w-[97%] sm:w-[90%] max-w-7xl p-5 mx-auto rounded-lg  pb-20 mt-5'>

                    <PostsList page='profile' />


                </div>








            </> 

     

    )
}

export default Profile