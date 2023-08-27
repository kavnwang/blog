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
                .post(`https://blog-api-lac-alpha.vercel.app/posts/delete/${props.postId}`)
                .then((res) => {console.log(res)});

        } catch (error) {
            
        }
    }

    return(
        <button onClick={onSubmit}>Delete Post</button>
    );
}

export default DeletePostButton;