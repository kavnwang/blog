import React from 'react'
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function PublishPostButton(props) {

    const onClick = async(data, e) => {
        try {
            axios 
                .post(`${import.meta.env.VITE_API_URL}/posts/update/${props.postId}`,{publish: !props.published})
                .then(
                    (res) => {console.log(res)},
                    props.handleState(!props.published),
                    this.forceUpdate()
                );
            
        } catch (error) {
            
        }
    }
    function displayButton() {
        if(props.published) {
            return <button onClick={onClick}>Unpublish Post</button>
        } else {
            return <button onClick={onClick}>Publish Post</button>
        }
    }
    return(
        displayButton()
    );
}

export default PublishPostButton;