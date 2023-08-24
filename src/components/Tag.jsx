import React from 'react'
import { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Tag = () => {

const [tag, setTag] = useState(null);
const {tagId} = useParams();

useEffect(() => {
    try {
        const tagURL = `http://localhost:3000/tags/${tagId}`;
        axios
            .get(tagURL)
            .then((res) => {
                console.log(res)
                setTag(res.data.tag)
            });
    } catch (error) {
        
    }
  }, [])


    return(
        <div>
            <h1>{tag && tag.name}</h1>
            <p>{tag && tag.color}</p>
        </div>
    );
}

export default Tag;