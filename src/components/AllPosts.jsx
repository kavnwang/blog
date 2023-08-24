import React from 'react'
import axios from "axios";
import { useEffect, useState} from 'react';
import PostLink from './PostLink';

const AllPosts = () => {

    const [posts, setPosts] = useState(null);

    useEffect(() => {
        
        try {
            axios 
                .get("http://localhost:3000/posts/recent")
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
            <h2>All Posts</h2>
              {posts && posts.map(post => <PostLink key={post._id} {...post}  />)} 
        </div>

    );
}

export default AllPosts;