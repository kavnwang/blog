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
import styles from '../styles/Post.module.css';
import { DateTime } from 'luxon';

function formatDate(date) {
    const luxonDate = DateTime.fromJSDate(date);
    return luxonDate.toFormat('MMMM d, yyyy');
  }

  
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
  
  const Bold = ({ children }) => <h1 className={styles.section}>{children}</h1>; //section
  const Italic = ({ children }) => <p className={styles.paragraph}>{children}</p>; //paragraph
  const Underline = ({ children }) => <ul><li className={styles.listItem}>{children}</li></ul>; //list
  const Code = ({ children }) => <Latex className={styles.latex}>{children}</Latex>; //latex

  const options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
      [MARKS.ITALIC]: (text) => <Italic>{text}</Italic>,
      [MARKS.UNDERLINE]: (text) => <Underline>{text}</Underline>,
      [MARKS.CODE]: (text) => <Code>{text}</Code>,
    },
  };
  
  

    function displayPost() {
        if(post) {
            console.log(post.text);
            return <div>
            <Nav />
            <div className={styles.postWrapper}>
            <h1 className={styles.title}>{post.title}</h1>
            <div className={styles.info}><p className={styles.date}>{formatDate(new Date(post.date))}</p> <p className={styles.author}>{post.author}</p></div>
            <h4 className={styles.subtitle}>{post.subtitle}</h4>
            <div className={styles.textWrapper}>
                {documentToReactComponents(post.text, options)}
            </div>
            <AllComments postId={postId} />
            </div>
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