import React from 'react'
import { useEffect, useState} from 'react';
import {Link, useParams } from 'react-router-dom';
import axios from 'axios';
import CreateCommentForm from './CreateCommentForm';
import AllComments from './AllComments';
import EditPostForm from './EditPostForm';
import DeletePostButton from './DeletePostButton';
import PublishPostButton from './PublishButton';

const Post = () => {

const [publish, setPublish] = useState(false);
const [post, setPost] = useState(null);
const {postId} = useParams();

useEffect(() => {
    try {
        const postURL = `http://localhost:3000/posts/${postId}`;
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
            <h1>{post.title}</h1>
            <p>{post.text}</p>
            <Link to={`/posts/${postId}/edit`}> Edit Post</Link>
            <CreateCommentForm post={post}/>
            <AllComments postId={postId} />
            <DeletePostButton postId={postId}/>
            <PublishPostButton postId={postId} published={publish} handleState={setPublish}/>
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