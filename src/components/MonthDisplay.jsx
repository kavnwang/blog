import React from 'react'
import axios from "axios";
import { useEffect, useState} from 'react';
import PostLink from './PostLink';
import Month from './Month';

const MonthDisplay = ({num}) => {

    const [posts, setPosts] = useState(null);

    useEffect(() => {
        
        try {
            const postURL = num ? `${import.meta.env.VITE_API_URL}/posts/recent/${num}` : `${import.meta.env.VITE_API_URL}/posts/recent/`;
            console.log(postURL);
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
            <h2>Recent Posts</h2>
              {posts && posts.map(post => <Month  />)} 
        </div>

    );
}

export default MonthDisplay;