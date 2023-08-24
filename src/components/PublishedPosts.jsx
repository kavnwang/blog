import React from 'react'
import axios from "axios";
import { useEffect, useState} from 'react';
import PostLink from './PostLink';

const PublishedPosts = () => {

    const [posts, setPosts] = useState(null);

    useEffect(() => {
        
        try {
            axios 
                .get("http://localhost:3000/posts/publish")
                .then((res) => {
                    setPosts(res.data.posts)
        });
        } catch (error) {
            
        }
        return () => {
            clearInterval();
        }
      
      },[])


    return(
        <div>
            <h2>Published Posts</h2>
              {posts && posts.map(post => <PostLink key={post._id} {...post}  />)} 
        </div>

    );
}

export default PublishedPosts;