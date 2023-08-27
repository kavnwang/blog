import React from 'react'
import axios from "axios";
import { useEffect, useState} from 'react';
import PostLink from './PostLink';
import DashPostLink from './DashPostLink';
const PublishedPosts = () => {

    const [posts, setPosts] = useState(null);

    useEffect(() => {
        
        try {
            axios 
                .get("https://blog-api-lac-alpha.vercel.app/posts/publish")
                .then((res) => {
                    setPosts(res.data.posts)
        });
        } catch (error) {
            
        }
        return () => {
            clearInterval();
        }
      
      },[])

      console.log(posts);
    return(
        <div>
            <h2>Published Posts</h2>
            
              {posts && posts.map(post => post &&<DashPostLink key={post._id} postId={post._id}  />)} 
        </div>

    );
}

export default PublishedPosts;