import React, { useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { RadioGroup } from '@headlessui/react'
import { MdRadioButtonChecked } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'
import { setTheme } from '../store/theme'
import { setUser } from '../store/auth/authSlice'


const Settings = () => {
    const userdata = useSelector(state => state.Auth.user)
    const { config, token } = useSelector(state => state.Auth)
    const [user, setuserData] = useState();
    const dispatch = useDispatch()
    const { theme } = useSelector(state => state.theme)
    const [load, setload] = useState(false);
    const [profileImage, setprofileImage] = useState(null);


    const ct64 = (file) => {
        setload(true)
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
            setload(false)
            setprofileImage(reader.result);
        }
        reader.onerror = function (error) {
            setload(false)
            console.log('Error: ', error);
        };

    }

    const getUserData = async () => {
        if (userdata) {
            try {
                const res = await axios.get(`https://socialmediamernapp.onrender.com/api/user/get-user/${userdata._id}`)
                setuserData(res.data)
            } catch (error) {
                console.log(error)
            }

        }
    }

    useLayoutEffect(() => {
        getUserData()
    }, [])

    const saveChanges = async (e) => {
        e.preventDefault()


        if (user) {
            setload(true)

            const data = profileImage?{
                username: e.target.username.value,
                phonenumber: e.target.phonenumber.value,
                profileImage:profileImage,
            }:{
                username: e.target.username.value,
                phonenumber: e.target.phonenumber.value,
            }
            

            try {
                console.log(data)
                const res = await axios.put(`http://localhost:5000/api/user/update-user`, data, config)
                dispatch(setUser({ ...res.data, token }))
                setload(false)
            } catch (error) {
                console.log(error)
                setload(false)
            }
        }
    }




    return (
        <>

            <div className=' flex relative items-center  flex-col h-fit  bg-white dark:bg-[#0b1120]  w-[97%] sm:w-[90%] max-w-7xl  mx-auto rounded-lg  mt-20'>





                <div className=' flex items-center justify-center'>{user ? <>
                    <img src={profileImage ? profileImage : user.profileImage} className=' h-32   w-32 self-center  rounded-full -mt-16  ' alt="user image" />
                    <label htmlFor="myfile" className=' h-[130px] bg-black/60 b w-[130px] opacity-0 hover:opacity-100 transition-all flex items-center justify-center cursor-pointer self-center  backdrop-blur-[2px] absolute rounded-full -mt-16  ' ><FaEdit size='30' /></label>
                    <input onChange={(e) => { ct64(e.target.files[0]) }} type="file" id="myfile" name="myfile" className=' hidden' accept='.jpeg,.png,.jpg' />

                </> : <div className=' h-32   w-32 self-center bg-slate-200 dark:bg-slate-700 animate-pulse  rounded-full -mt-16  ' alt="user image" />}</div>






                <form onSubmit={saveChanges} className=' w-[95%] max-w-xl mt-12 flex  flex-col'>

                    <div className=' my-5'>
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            First name
                        </label>
                        <input
                            defaultValue={user?.username}
                            type="text"
                            id="name"
                            name='username'
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="your name"
                        />
                    </div>
                    <div className=' my-5'>
                        <label
                            htmlFor="number"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Phone number
                        </label>
                        <input
                            type="number"
                            id="number"
                            name='phonenumber'
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="your phone number"
                            defaultValue={user?.phonenumber}
                        />
                    </div>
                    {/* <div className=' my-5'>
                        <label
                            htmlFor=" bio"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            bio
                        </label>
                        <input
                            type="text"
                            id=" bio"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="your  bio"
                            defaultValue={user?.bio}
                        />
                    </div> */}

                    <button className={` w-[90%] py-2 rounded-md self-center bg-green-600 hover:bg-green-700 ${load && ' opacity-60 '} text-white my-14`} disabled={load && true} >Save</button>
                </form>




            </div>

            <div className=' flex relative items-center  flex-col h-fit  bg-white dark:bg-[#0b1120] p-5  w-[97%] sm:w-[90%] max-w-7xl  mx-auto rounded-lg  my-20'>
                <span className='  font-bold  text-3xl dark:text-white tracking-[2px]  mb-5'>Apperance</span>
                <RadioGroup className=' w-full max-w-sm' defaultValue={theme} onChange={(e) => {
                    dispatch(setTheme(e))
                    localStorage.setItem('theme', e)
                }}>
                    <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
                    <div className="space-y-2">

                        <RadioGroup.Option
                            value={'light'}
                            className={({ active, checked }) =>
                                `${active
                                    ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                                    : ''
                                }
                  ${checked ? 'bg-sky-900 bg-opacity-75 text-white' : 'dark:bg-slate-700 dark:text-white   bg-white'
                                }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                            }
                        >
                            {({ active, checked }) => (
                                <>
                                    <div className="flex w-full items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="text-sm">
                                                <RadioGroup.Label
                                                    as="p"
                                                    className={`font-medium`}
                                                >
                                                    light
                                                </RadioGroup.Label>
                                                <RadioGroup.Description
                                                    as="span"
                                                    className={`inline}`}
                                                >
                                                    light mode
                                                </RadioGroup.Description>
                                            </div>
                                        </div>
                                        {checked && (
                                            <div className="shrink-0 text-white">
                                                <MdRadioButtonChecked size='24' color='white' />
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </RadioGroup.Option>


                        <RadioGroup.Option
                            value={'dark'}
                            className={({ active, checked }) =>
                                `${active
                                    ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                                    : ''
                                }
                  ${checked ? 'bg-sky-900 bg-opacity-75 text-white' : 'dark:bg-slate-700 dark:text-white   bg-white'
                                }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                            }
                        >
                            {({ active, checked }) => (
                                <>
                                    <div className="flex w-full items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="text-sm">
                                                <RadioGroup.Label
                                                    as="p"
                                                    className={`font-medium`}
                                                >
                                                    dark
                                                </RadioGroup.Label>
                                                <RadioGroup.Description
                                                    as="span"
                                                    className={`inline}`}
                                                >
                                                    dark mode
                                                </RadioGroup.Description>
                                            </div>
                                        </div>
                                        {checked && (
                                            <div className="shrink-0 text-white">
                                                <MdRadioButtonChecked size='24' color='white' />
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </RadioGroup.Option>

                    </div>
                </RadioGroup>
            </div>






        </>
    )
}

export default Settings