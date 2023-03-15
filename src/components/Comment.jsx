import axios from 'axios';
import React, { useLayoutEffect, useState } from 'react'
import { ImSpinner2 } from 'react-icons/im';
import { IoMdTrash } from 'react-icons/io';
import { useSelector } from 'react-redux';

const Comment = ({ comment, deleteComment,gotoProfile }) => {
const {user } = useSelector(e=>e.Auth)
    const [userData, setuserData] = useState();
    const getUserData = async () => {

        try {
            const res = await axios.get(`https://socialmediamernapp.onrender.com/api/user/get-user/${comment.user}`)

            setuserData(res.data)

        } catch (error) {
            console.log(error)
        }


    }

    useLayoutEffect(() => {
        comment && getUserData()

    }, [])


    return (<>
        {userData ?
            <div className=' flex w-full  my-3'>

                <div className="w-8 h-8">
                    <img
                    onClick={()=>gotoProfile(comment.user)}
                        alt="avatar"
                        src={userData.profileImage}
                        className="rounded-full w-full h-full object-cover cursor-pointer"
                    />
                </div>
                <div className=' relative  dark:text-white p-7  pb-3  flex items-center justify-center bg-[#eee] dark:bg-slate-700 mx-2 rounded-md max-w-[250px]' >
                    <span onClick={()=>gotoProfile(comment.user)} className=' absolute top-1 cursor-pointer left-2  text-black dark:text-white break-words'>{userData.username}</span>
                    <span className=' max-w-full text-black dark:text-white break-words pr-3'> {comment.comment}</span>
                   {comment.user == user._id&& <IoMdTrash size='20' className='  absolute -right-2 -top-2 hover:text-red-600 cursor-pointer' onClick={()=>deleteComment(comment)} />}
                </div>

            </div>

            : <div className=' w-full h-full flex items-center justify-center'><ImSpinner2 className=' animate-spin text-sky-600' size='25' /></div>}
    </>)
}

export default Comment