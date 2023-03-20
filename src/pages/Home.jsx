import React, { memo } from 'react'
import PostsList from '../components/PostsList'
import Profile from './Profile'

const Home = () => {


    return (
        <div className=' flex justify-center'>
            <PostsList page='home'  />

        </div>
    )
}

export default Home