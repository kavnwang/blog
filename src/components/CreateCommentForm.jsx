import React from 'react'
import { useForm } from "react-hook-form";
import axios from "axios";
import styles from '../styles/CreateCommentForm.module.css';


function CreateCommentForm(props) {

    const { register, handleSubmit } = useForm();

    const onSubmit = async(data, e) => {
        try {
            axios 
                .post(`https://blog-api-lac-alpha.vercel.app/posts/${props.post._id}/comments/create`, {author: data.author, comment: data.comment, postId: props.post._id})
                .then((res) => {console.log(res)});
        } catch (error) {
            
        }
    }

    return(
        <div className={styles.divWrapper}>
            <h2>Create Comment</h2>
            <form className={styles.formWrapper} onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor='author'>Author</label>
            <input {...register("author")} />
            <label htmlFor='comment'>Comment</label>

            <textarea className={styles.commentInput} {...register("comment")} />

            <input className={styles.submitButton} type="submit" />
        </form>
        </div>
        
    );
}

export default CreateCommentForm;