import React from 'react'
import axios from "axios";
import { useEffect, useState} from 'react';
import Comment from './Comment';
function Comments(props) {

    const [comments, setComments] = useState(null);

    useEffect(() => {
        
        try {
            axios 
                .get(`http://localhost:3000/posts/${props.postId}/comments`)
                .then((res) => {
                    setComments(res.data.comments.comments);
                })
        } catch (error) {
            
        }
        return () => {
            clearInterval();
        }
      
      }, [])
    
    return(
        <div>
            <h2>Comments</h2>
              {comments && comments.map(comment => <Comment key={comment} commentId={comment}  />)} 
        </div>

    );
}

export default Comments;