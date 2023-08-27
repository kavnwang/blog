import React from 'react'
import axios from "axios";
import { useEffect, useState} from 'react';
import PostLink from './PostLink';
import DashPostLink from './DashPostLink';
const UnpublishedPosts = () => {

    const [posts, setPosts] = useState(null);

    useEffect(() => {
        
        try {
            axios 
                .get("http://localhost:3000/posts/unpublish")
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
            <h2>Unpublished Posts</h2>
              {posts && posts.map(post => <DashPostLink key={post._id} postId={post._id}  />)} 
        </div>

    );
}

export default UnpublishedPosts;