import React from 'react'
import axios from "axios";
import { useEffect, useState} from 'react';
import PostLink from './PostLink';
import AllTags from './AllTags.jsx';
const TagPosts = ({num}) => {

    const [posts, setPosts] = useState(null);

    useEffect(() => {
        
        try {
            const postURL = num ? `${import.meta.env.VITE_API_URL}/posts/recent/${num}` : `${import.meta.env.VITE_API_URL}/posts/recent/`
            axios 
                .get(postURL)
                .then((res) => {
                    setPosts(res.data.posts)
        });
        } catch (error) {
            
        }
        return () => {
            clearInterval();
        }
      
      }, [])


    return(
        <div>
            <h2>Tag Posts</h2>
              <AllTags />
        </div>

    );
}

export default TagPosts;