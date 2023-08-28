import React from 'react'
import axios from "axios";
import { useEffect, useState} from 'react';
import Post from './Post';
import { Link } from "react-router-dom";
import styles from '../styles/PostLink.module.css';
import TagLink from './TagLink';
import PostLink from './PostLink';
import DeletePostButton from './DeletePostButton';
import PublishPostButton from './PublishButton';

const DashPostLink =  ({postId}) => {
    const [publish, setPublish] = useState(false);

    useEffect(() => {
        try {
            const postURL = `${import.meta.env.VITE_API_URL}/posts/${postId}`;
            axios
                .get(postURL)
                .then((res) => {
                    setPublish(res.data.post.publish);
                });
        } catch (error) {
            
        }
      }, []);

    return(
        <div>
            <PostLink postId={postId}/>
            <Link to={`/posts/${postId}/edit`}> Edit Post</Link>
            <DeletePostButton postId={postId}/>
            <PublishPostButton postId={postId} published={publish} handleState={setPublish}/>
        </div>
    );
}

export default DashPostLink;