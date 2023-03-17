import axios from 'axios'
import React, { useState } from 'react'
import { HiX } from 'react-icons/hi'
import { MdPermMedia } from 'react-icons/md'
import { ImSpinner2 } from 'react-icons/im'
import { useSelector } from 'react-redux'


const AddPost = ({ toggle }) => {
    const { config, user } = useSelector(state => state.Auth)
    const [text, setText] = useState();
    const [image, setimg] = useState();
    const [loader, setloader] = useState(false);

    const addPost = async () => {
        setloader(true)

        try {
            // await axios.post(`https://socialmediamernapp.onrender.com/api/posts/add-post`, {
            await axios.post(`http://localhost:5000/api/posts/add-post`, {
                title: text,
                image,
            }, config)

            setloader(false)
            toggle()
        } catch (error) {
            console.log(error)
            setloader(false)
        }
    }




    const ct64 = (file) => {
        setloader(true)
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
            setloader(false)
            setimg(reader.result);
        }
        reader.onerror = function (error) {
            setloader(false)
            console.log('Error: ', error);
        };

    }






    return (
        <div id='do' onClick={(e) => { e.target.id == 'do' && toggle() }} className=' z-50 fixed top-0 bottom-0 left-0 right-0 backdrop-blur-lg bg-black/40 flex   justify-center'>

            <div className=' mt-14 h-fit pb-5 z-40 w-[90%] relative max-w-[600px]  bg-white dark:bg-black  rounded-2xl  '>
                <HiX onClick={() => toggle()} size='24' className=' hover:text-blue-600 absolute right-3 top-3  w-6 h-6  cursor-pointer' />

                <div className='h-full flex flex-col items-center  w-full ml-1'>
                    <div className=' self-start ml-3 mt-5 flex  h-fit items-center'>
                        <img src={user.profileImage} alt="avatar" className=' border-[1px] border-black dark:border-white rounded-full w-10 h-10 ' />
                        <div className=' font-semibold ml-2 dark:text-white'>{user.username}</div>
                    </div>
                    <textarea onChange={(e) => { setText(e.target.value) }} placeholder="What's in your mind" className=' font-semibold text-xl bg-transparent  w-[85%] outline-none mt-5  min-h-[150px] max-h-[150px] dark:text-white' />





                    {image && <img src={image} className='rounded-md mx-auto max-w-inherit   max-h-64 ring-1' alt="image" />}



                    <div className='w-[90%] bg-black/30 dark:bg-slate-200/30 my-3 h-[1px] mx-auto rounded-md'></div>



                    <div className='  w-[90%] h-[40px]  items-center flex justify-between'>


                        <div className='text-black  dark:text-white'>



                            <label htmlFor="myfile"><MdPermMedia size='20' className=' hover:text-blue-600 cursor-pointer' /></label>
                            <input onChange={(e) => { ct64(e.target.files[0]) }} type="file" accept='.jpg,.jpeg,.png' id="myfile" name="myfile" className=' hidden' />

                        </div>
                        <button disabled={loader} onClick={addPost} className={`${loader ? 'opacity-60 ' : ''} bg-gradient-to-r  from-emerald-600 to-teal-500 hover:from-teal-600 hover:to-emerald-600 transition-all px-4 py-1 rounded-md`}>{loader ? <ImSpinner2 size='20' className=' animate-spin text-white' /> : 'Post'}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddPost