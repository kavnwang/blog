import React from 'react'
import { useEffect, useState} from 'react';
import axios from 'axios';
import styles from '../styles/Comment.module.css'
import { DateTime } from 'luxon';

function formatDate(date) {
    const luxonDate = DateTime.fromJSDate(date);
    return luxonDate.toFormat('MMMM d, yyyy');
  }

function Comment({commentId}) {

    const [comment, setComment] = useState(null);
    
    useEffect(() => {
        try {
            axios
                .get(`${import.meta.env.VITE_API_URL}/comments/${commentId}`)
                .then((res) => {
                    setComment(res.data.comment);
                });
        } catch (error) {
            
        }
      }, [])
    return(
        <div className={styles.commentWrapper}>
            <div className={styles.headerWrapper}>
            <p className={styles.commentAuthor}>{comment && comment.author}</p>
            <p className={styles.commentDate}>  {comment && formatDate(new Date(comment.date))}</p>
            </div>
            <p className={styles.commentText}>{comment && comment.comment}</p>
        </div>
    );
}

export default Comment;