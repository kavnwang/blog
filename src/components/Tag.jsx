import React from 'react'
import { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PostLink from './PostLink';
import Nav from './Nav';

const Tag = () => {

const [tag, setTag] = useState(null);
const {tagId} = useParams();

useEffect(() => {
    try {
        const tagURL = `http://localhost:3000/tags/${tagId}`;
        axios
            .get(tagURL)
            .then((res) => {
                setTag(res.data.tag)
            });
    } catch (error) {
        
    }
  }, [])

    function display() {
        if(tag) {
            const posts = [];
            tag.posts.forEach((post) => {
                posts.push(<PostLink key={post} postId={post} />)
            });
            return posts;
        } 
        return <div></div>
    }

    return(
        <div>
            <Nav />
            {display()}
        </div>
    );
}

export default Tag;