import React from 'react'
import { useEffect, useState} from 'react';
import {Link, useParams } from 'react-router-dom';
import axios from 'axios';
import CreateCommentForm from './CreateCommentForm.jsx';
import AllComments from './AllComments.jsx';
import Nav from './Nav'
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Latex from 'react-latex';

const Post = () => {

const [post, setPost] = useState(null);
const {postId} = useParams();


useEffect(() => {
    try {
        const postURL = `${import.meta.env.VITE_API_URL}/posts/${postId}`;
        axios
            .get(postURL)
            .then((res) => {
                setPost(res.data.post)
            });
    } catch (error) {
        
    }
  }, [])
  
  const Bold = ({ children }) => <h1 className="bold">{children}</h1>;
    
  const options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
    },
  };
  
  

    function displayPost() {
        if(post) {
            return <div>
            <Nav />
            <h1>{post.title}</h1>
            <h4>{post.subtitle}</h4>
            {documentToReactComponents(post.text, options)}

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