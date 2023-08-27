import React from 'react'
import { useEffect, useState} from 'react';
import {Link, useParams } from 'react-router-dom';
import axios from 'axios';
import CreateCommentForm from './CreateCommentForm.jsx';
import AllComments from './AllComments.jsx';
import Nav from './Nav'
const Post = () => {

const [publish, setPublish] = useState(false);
const [post, setPost] = useState(null);
const {postId} = useParams();

useEffect(() => {
    try {
        const postURL = `${import.meta.env.VITE_API_URL}/posts/${postId}`;
        axios
            .get(postURL)
            .then((res) => {
                setPublish(res.data.post.publish);
                setPost(res.data.post)
            });
    } catch (error) {
        
    }
  }, [])

    function displayPost() {
        if(post) {
            return <div>
            <Nav />
            <h1>{post.title}</h1>
            <h4>{post.subtitle}</h4>
            <p>{post.text}</p>
            <AllComments postId={postId} />
        </div>
        }
        else {
            return <div></div>;
        }
    }

    return(
        displayPost()
    );
}

export default Post;