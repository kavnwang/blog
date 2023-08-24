import React from 'react'
import { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Comment(props) {

    const [comment, setComment] = useState(null);
    
    useEffect(() => {
        try {
            axios
                .get(`http://localhost:3000/comments/${props.commentId}`)
                .then((res) => {
                    setComment(res.data.comment)
                });
        } catch (error) {
            
        }
      }, [])
    return(
        <div>
            <p>{comment && comment.author}</p>
            <p>{comment && comment.comment}</p>
        </div>
    );
}

export default Comment;