import React from 'react'
import axios from "axios";
import { useEffect, useState} from 'react';
import PostLink from './PostLink';
import styles from '../styles/RecentPostDisplay.module.css'
import {Link} from 'react-router-dom';
import TagLink from './TagLink';

const RecentPostDisplay = () => {

    const [post, setPost] = useState(null);

    useEffect(() => {
        
        try {
            const postURL = `${import.meta.env.VITE_API_URL}/posts/recent/1`;
            axios 
                .get(postURL)
                .then((res) => {
                    setPost(res.data.posts);
        });
        } catch (error) {
            
        }
        return () => {
            clearInterval();
        }
      
      }, [])


    return(       <div className={styles.post}>
        {post && post[0] && <Link className={styles.postTitle} to={`/posts/${post[0]._id}`}>
            {post && post[0].title}
         </Link>}
    <div className={styles.postTitleContainer}>
        <span className={styles.postDate}>{post && post[0] && new Date(post[0].date).toLocaleDateString()}</span>
        <div className={styles.tagsBar}>                    
            {post && post[0] && post[0].tags.map((tag) => <TagLink key={tag} tagId={tag}/> )}
        </div>
    </div>
    <p className={styles.postDescription}>{post && post[0] && post[0].subtitle}</p>
</div>

    );
}

export default RecentPostDisplay;