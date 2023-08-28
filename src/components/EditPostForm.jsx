import React from 'react'
import { useForm} from "react-hook-form";
import axios from "axios";
import {useEffect, useState} from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AddTag from './AddTag';
import styles from '../styles/CreatePostForm.module.css'


const  EditPostForm = ({postId}) => {
    const [post, setPost] = useState(null);

    const { register, watch, getValues, useWatch, control, handleSubmit } = useForm();

    const vals = getValues(["title","author","subtitle","text"]);

    useEffect(() => {
        try {
            const postURL = `${import.meta.env.VITE_API_URL}/posts/${postId}`;
            axios
                .get(postURL)
                .then((res) => {
                    setPost(res.data.post),
                    console.log(res.data.post);
                }
                );
        } catch (error) {
            
        }
        
      }, []);

    useEffect(() => {
        const postURL = `${import.meta.env.VITE_API_URL}/posts/update/${postId}`;
            const watchFields = watch((data, {}) =>
            axios
            .post(postURL, data)
            .then((res) => {
                console.log(res.data.post);
                setPost(res.data.post);
            }));
            return () => watchFields.unsubscribe()
        }
  , [vals]);

    const onSubmit = async(data, e) => {
        try {
            axios 
                .post(`${import.meta.env.VITE_API_URL}/posts/update/${postId}`, {publish: !post.publish})
                .then((res) => {console.log(res)});
        } catch (error) {
            
        }
    }

function displayForm() {
    if(post) {
        return <div className={styles.divWrapper} >
            <AddTag postId={postId} />
            <form className={styles.formWrapper} onSubmit={handleSubmit(onSubmit)}>
            <input className={styles.submitButton} type="submit" />
            <input defaultValue={post.title} placeholder="Enter title..." className={styles.postTitle} {...register("title")} />
            <input defaultValue={post.author} placeholder="Enter author..."  className={styles.postAuthor} {...register("author")} />
            <input defaultValue={post.subtitle} placeholder="Enter subtitle..." className={styles.subTitle} {...register("subtitle")} />            
            <input defaultValue={post.text} placeholder={loremIpsum} className={styles.postText} {...register("text")} />
        </form>
        </div>
    } else {
        return <div></div>
    }
}

    const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis vel eros donec ac odio tempor orci.";
    
    return(
        <div>
            {displayForm()}
        </div>
    );

}

export default EditPostForm;