import React from 'react'
import axios from "axios";
import { useEffect, useState} from 'react';
import Comment from './Comment';
import styles from '../styles/CreateCommentForm.module.css';
import { useForm } from "react-hook-form";

function AllComments({postId}) {

    const [comments, setComments] = useState(null);
    const { register, handleSubmit } = useForm();
    const [show, setShow] = useState(false);

    const handleComment = () => {
        setShow(true);
    }
    useEffect(() => {
        
        try {
            axios 
                .get(`${import.meta.env.VITE_API_URL}/posts/${postId}/comments`)
                .then((res) => {
                    console.log(res);
                    setComments(res.data.comments.comments);
                })
        } catch (error) {
            
        }
        return () => {
            clearInterval();
        }
      
      }, [])

      const onSubmit = async(data, e) => {
          try {
              axios 
                  .post(`${import.meta.env.VITE_API_URL}/posts/${postId}/comments/create`, {author: data.author, comment: data.comment, postId: postId})
                  .then(
                    axios.get(`${import.meta.env.VITE_API_URL}/posts/${postId}/comments`)
                  .then((res) => {
                      console.log(res);
                      setComments(res.data.comments.comments);
                  })
  );
          } catch (error) {
              
          }
      }

    return(
        <div>
            <div className={styles.divWrapper}>
            {!show && <button className={styles.commentButton} onClick={handleComment}>Create Comment</button>}
            {show && <form className={styles.formWrapper} onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor='author'>Author</label>
            <input {...register("author")} />
            <label htmlFor='comment'>Comment</label>

            <textarea className={styles.commentInput} {...register("comment")} />

            <input className={styles.submitButton} type="submit" />
        </form>
}   
        </div>
              {comments && comments.map(comment => <Comment key={comment} commentId={comment} />)} 
        </div>

    );
}

export default AllComments;