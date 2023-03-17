import axios from 'axios'
import React, { memo, useEffect,useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Post from './Post';

const PostsList = ({ page }) => {
    const { config,user } = useSelector(state => state.Auth)
    const { userId } = useSelector(state => state.profile)
    const [posts, setposts] = useState([]);
    const useForceUpdate = () => {
        const [value, setValue] = useState(0);
        return () => setValue(value => value + 1);
    }
    const forceUpdate = useForceUpdate();
    const navigate = useNavigate()

    const getPosts = async () => {

        try {
            if (page == 'home') {
                const res = await axios.get('https://socialmediamernapp.onrender.com/api/posts/get-timeline-post', config)
                setposts(res.data)
            } else if (page == 'profile' && userId) {
                const res = await axios.get('https://socialmediamernapp.onrender.com/api/posts/get-someone-posts/' + userId, config)
                setposts(res.data.posts)
            } else {
                navigate('/')
            }

        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        config && getPosts()
    }, [page == 'profile'&&userId])




    const deletePost = async (post) => {
        try {
            await axios.delete('https://socialmediamernapp.onrender.com/api/posts/delete-post/' + post._id, config)

            const newposts = posts
            newposts.splice(posts.findIndex(pst => pst._id == post._id), 1)

            setposts(newposts)
            forceUpdate()
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <div>
            {posts.map(post => <Post key={Math.random()} deletePost={deletePost} post={post} />)}
        </div>
    )
}

export default memo(PostsList)