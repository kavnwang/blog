import React from 'react'
import { useForm , useFieldArray} from "react-hook-form";
import axios from "axios";
import {useEffect, useState} from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AddTag from './AddTag';
import styles from '../styles/CreatePostForm.module.css'

const  EditPostForm = ({postId}) => {
    const [post, setPost] = useState(null);

    const { register, watch, getValues, useWatch, control, handleSubmit, formState: { isDirty, dirtyFields }, setValue } = useForm();

    const vals = getValues();
    const { fields, append, update } = useFieldArray({
        control,
        name: "tags"
    });

    useEffect(() => {
        try {
            const postURL = `http://localhost:3000/posts/${postId}`;
            axios
                .get(postURL)
                .then((res) => {
                    setPost(res.data.post)
                });
        } catch (error) {
            
        }
    
      }, [])

    useEffect(() => {
        const postURL = `http://localhost:3000/posts/update/${postId}`;
            const watchFields = watch((data, { title, author, subtitle, text }) =>
        axios
            .post(postURL, data)
            .then((res) => {
                console.log(data);
                setPost(data);
            }));
            return () => watchFields.unsubscribe()
        }
  , [vals])


    const onSubmit = async(data, e) => {
        try {
            axios 
                .post(`http://localhost:3000/posts/update/${postId}`, {publish: !post.publish})
                .then((res) => {console.log(res)});
        } catch (error) {
            
        }
    }

function displayForm() {
    if(post) {
        return <div className={styles.divWrapper} >
            <form className={styles.formWrapper} onSubmit={handleSubmit(onSubmit)}>
            <input defaultValue={post.title} placeholder="Enter title..." className={styles.postTitle} {...register("title")} />
            <input defaultValue={post.author} placeholder="Enter author..."  className={styles.postAuthor} {...register("author")} />
            <input defaultValue={post.subtitle} placeholder="Enter subtitle..." className={styles.subTitle} {...register("subtitle")} />            
            <ul className={styles.tagWrapper}>
                {
                    fields.map((field,index) => (   
                            <AddTag key={field.id}
                            control={control}
                            update={update}
                            index={index}
                            value={field}
                             />
                    )
                    )
                }
            </ul>
            
            <button className={styles.addTag} type="button" onClick={() => append({name: ""})}>+</button>
            <input defaultValue={post.text} placeholder={loremIpsum} className={styles.postText} {...register("text")} />
            <input className={styles.submitButton} type="submit" />
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