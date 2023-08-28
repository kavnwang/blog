import React from 'react'
import axios from "axios";

function DeletePostButton(props) {

    const onSubmit = async(data, e) => {
        try {
            console.log(props.postId);
            axios 
                .post(`${import.meta.env.VITE_API_URL}/posts/delete/${props.postId}`)
                .then((res) => {console.log(res)});

        } catch (error) {
            
        }
    }

    return(
        <button onClick={onSubmit}>Delete Post</button>
    );
}

export default DeletePostButton;