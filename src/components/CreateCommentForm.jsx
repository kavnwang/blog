import React from 'react'
import { useForm } from "react-hook-form";
import axios from "axios";


function CreateCommentForm(props) {

    const { register, handleSubmit } = useForm();

    const onSubmit = async(data, e) => {
        try {
            axios 
                .post(`http://localhost:3000/posts/${props.post._id}/comments/create`, {author: data.author, comment: data.comment, postId: props.post._id})
                .then((res) => {console.log(res)});
        } catch (error) {
            
        }
    }

    return(
        <div>
            <h2>Create Comment</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor='author'>Author</label>
            <input {...register("author")} />
            <label htmlFor='comment'>Comment</label>

            <input {...register("comment")} />

            <input type="submit" />
        </form>
        </div>
        
    );
}

export default CreateCommentForm;