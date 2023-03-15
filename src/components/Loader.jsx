import React from 'react'
import { ImSpinner10 } from 'react-icons/im'
const Loader = () => {
    return (
        <div className=' z-50 fixed left-0 right-0 bottom-0 top-0 bg-black/50 backdrop-blur-xl flex items-center justify-center text-white'>

            <div>
                <ImSpinner10 size='50' className=' animate-spin my-5' />
                Loading...
            </div>
        </div>
    )
}

export default Loader