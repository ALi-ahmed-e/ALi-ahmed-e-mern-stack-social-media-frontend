import React,{memo} from 'react'
import PostsList from '../components/PostsList'

const Home = () => {


    return (
        <div>
        <PostsList page='home' />
        </div>
    )
}

export default Home