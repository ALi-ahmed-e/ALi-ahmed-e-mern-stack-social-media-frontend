import axios from 'axios'
import React, { useState } from 'react'
import { HiX } from 'react-icons/hi'
import { MdPermMedia } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'


const AddPost = ({ toggle }) => {
    const { config, user } = useSelector(state => state.Auth)
    const dispatch = useDispatch()
    const [text, setText] = useState();
    const [file, setfile] = useState();


    const addPost = async () => {
        const data = {
            title: text,
            image: await ct64(file)
        }

        console.log(data)


        try {
            const res = await axios.post(`https://socialmediamernapp.onrender.com/api/posts/add-post`, data, config)
            const post = res.data
            console.log(post)
        } catch (error) {
            console.log(error)
        }
    }

    const ct64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = error => reject(error)
        })
    }


    // const test = (file) => {
    //     let reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = function () {
    //         console.log(reader.result);
    //     };
    //     reader.onerror = function (error) {
    //         console.log('Error: ', error);
    //     };
    // }


    return (
        <div id='do' onClick={(e) => { e.target.id == 'do' && toggle() }} className=' z-50 fixed top-0 bottom-0 left-0 right-0 backdrop-blur-lg bg-black/40 flex   justify-center'>

            <div className=' mt-14 h-fit pb-5 z-40 w-[90%] relative max-w-[600px]  bg-white dark:bg-black  rounded-2xl  '>
                <HiX onClick={() => toggle()} size='24' className=' absolute right-1 top-1  w-6 h-6 dark:text-white cursor-pointer' />

                <div className='h-full flex flex-col items-center  w-full ml-1'>
                    <div className=' self-start ml-3 mt-5 flex  h-fit items-center'>
                        <img src={user.profileImage} alt="avatar" className=' border-[1px] border-black dark:border-white rounded-full w-10 h-10 ' />
                        <div className=' font-semibold ml-2 dark:text-white'>{user.username}</div>
                    </div>
                    <textarea onChange={(e) => { setText(e.target.value) }} placeholder="What's in your mind" className=' font-semibold text-xl bg-transparent  w-[85%] outline-none mt-5  min-h-[150px] max-h-[150px] dark:text-white' />



                    {/* <div>
                        {file && <Fragment>
                            {file.type.includes('image')  ? <img src={file.file} className='media rounded-md mx-auto' alt="" />
                                : <video controls src={media.file} className='media rounded-md mx-auto' alt="" />}

                        </Fragment>

                        }
                    </div> */}

                    <div className='w-[90%] bg-black/30 dark:bg-slate-200/30 my-3 h-[1px] mx-auto rounded-md'></div>



                    <div className='  w-[90%] h-[40px]  items-center flex justify-between'>


                        <div className='text-black  dark:text-white'>



                            <label htmlFor="myfile"><MdPermMedia size='20' className=' hover:text-blue-600 cursor-pointer' /></label>
                            <input onChange={(e) => { setfile(e.target.files[0]) }} type="file" id="myfile" name="myfile" className=' hidden' accept='.jpeg,.png,jpg' />
                            {/* <input onChange={(e) => { test(e.target.files[0]) }} type="file" /> */}

                        </div>
                        {/* <button className={`px-3 py-1 ${txt ? ' opacity-100 hover:bg-indigo-600 cursor-pointer' : ' opacity-50 cursor-default'} ${txt} bg-indigo-500  text-white  rounded-md font-semibold mr-2`}>{spinner}</button> */}
                        <button onClick={addPost} className={` bg-gradient-to-r  from-emerald-600 to-teal-500 hover:from-teal-600 hover:to-emerald-600 transition-all px-4 py-1 rounded-md`}>Post</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddPost