import React from 'react'
import axios from "axios";
import { useEffect, useState} from 'react';
import PostLink from './PostLink';

const PopularPosts = ({num}) => {

    const [posts, setPosts] = useState(null);

    useEffect(() => {
        
        try {
            const postURL = (num > 0) ? `${import.meta.env.VITE_API_URL}/posts/popular/${num}` : `${import.meta.env.VITE_API_URL}/posts/popular/`
            axios 
                .get(postURL)
                .then((res) => {
                    setPosts(res.data.posts)
        });
        } catch (error) {
            
        }
        return () => {
            clearInterval();
        }
      
      }, [])


    return(
        <div>
            <h2>Popular Posts</h2>
              {posts && posts.map(post => <PostLink key={post} postId={post._id}  />)} 
        </div>

    );
}

export default PopularPosts;