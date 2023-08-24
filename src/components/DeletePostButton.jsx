import React from 'react'
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function DeletePostButton(props) {

    const onSubmit = async(data, e) => {
        try {
            console.log(props.postId);
            axios 
                .post(`http://localhost:3000/posts/delete/${props.postId}`)
                .then((res) => {console.log(res)});
                window.location.href = `http://localhost:5173/dash`;

        } catch (error) {
            
        }
    }

    return(
        <button onClick={onSubmit}>Delete Post</button>
    );
}

export default DeletePostButton;