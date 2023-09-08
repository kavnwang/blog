import React from 'react'
import axios from "axios";
import { useEffect, useState} from 'react';
import Post from './Post';
import { Link } from "react-router-dom";
import styles from '../styles/PostLink.module.css';
import TagLink from './TagLink';
import { DateTime } from 'luxon';

function formatDate(date) {
    const luxonDate = DateTime.fromJSDate(date);
    return luxonDate.toFormat('MMMM d, yyyy');
  }

  
const PostLink =  ({postId}) => {
    const [post, setPost] = useState(null);

    useEffect(() => {
        try {
            const postURL = `${import.meta.env.VITE_API_URL}/posts/${postId}`;
            axios
                .get(postURL)
                .then((res) => {
                    setPost(res.data.post);
                    console.log(res.data.post);
                });
        } catch (error) {
            
        }
      }, []);

    return(
       <div className={styles.post}>
            <Link className={styles.postTitle} to={`/posts/${postId}`}>
                {post && post.title}
             </Link>
        <div className={styles.postTitleContainer}>
            <span className={styles.postDate}>{post && formatDate(new Date(post.date))}</span>
            <div className={styles.tagsBar}>                    
                {post && post.tags.map((tag) => <TagLink key={tag} tagId={tag}/> )}
            </div>
        </div>
        <p className={styles.postDescription}>{post && post.subtitle}</p>
    </div>
    );
}

export default PostLink;