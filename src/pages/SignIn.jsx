import { useDispatch, useSelector } from 'react-redux'
import { signIn } from '../store/auth/authSlice'
import { Link } from 'react-router-dom'

const SignIn = () => {
    const dispatch = useDispatch()
    const { signError } = useSelector(state => state.Auth)

    const signin = async (e) => {
        e.preventDefault()

        dispatch(signIn({
            email: e.target.email.value,
            password: e.target.password.value,
        }))

    }


    return (

        <form onSubmit={signin} className=' bg-white dark:bg-slate-800 w-full max-w-lg rounded-lg p-8  mx-auto mt-40'>
            <h1 className=' font-extrabold lett text-2xl dark:text-white tracking-[2px] text-center mb-5'>Sign in</h1>
            <div className="relative z-0 w-full mb-10 group">
                <input
                    type="email"
                    name="email"
                    id="floating_email"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                />
                <label
                    htmlFor="floating_email"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    Email address
                </label>
            </div>
            <div className="relative z-0 w-full mb-10 group">
                <input
                    type="password"
                    name="password"
                    id="floating_password"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                />
                <label
                    htmlFor="floating_password"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    Password
                </label>
            </div>
            <p className=' text-red-600 text-center -mt-8 mb-2'>{signError}</p>
            <div className=' flex mt-5  items-center justify-between sm:flex-row flex-col'>



                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 mt-5 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Submit
                </button>

                <p className=' dark:text-white my-2'>don't have an account <Link className=' underline hover:text-blue-400' to='/register'>register</Link></p>


            </div>
        </form>



    )
}

export default SignIn