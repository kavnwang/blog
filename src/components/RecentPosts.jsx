import React from 'react'
import axios from "axios";
import { useEffect, useState} from 'react';
import PostLink from './PostLink';
import styles from '../styles/GetPosts.module.css'

const RecentPosts = ({num}) => {

    const [posts, setPosts] = useState(null);

    useEffect(() => {
        
        try {
            const postURL = (num > 0) ? `${import.meta.env.VITE_API_URL}/posts/recent/${num}` : `${import.meta.env.VITE_API_URL}/posts/recent/`;
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
        <div className={styles.postWrapper}>
            <h2>Recent Posts</h2>
              {posts && posts.map(post => <PostLink key={post._id} postId={post._id}  />)} 
        </div>

    );
}

export default RecentPosts;