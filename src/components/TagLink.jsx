import React from 'react'
import axios from "axios";
import { useEffect, useState} from 'react';
import Tag from './Tag';
import { Link } from "react-router-dom";
import styles from '../styles/TagLink.module.css'
function TagLink({tagId}) {
    const [tag, setTag] = useState(null);

    useEffect(() => {
        try {
            const tagURL = `${import.meta.env.VITE_API_URL}/tags/${tagId}`;
            axios
                .get(tagURL)
                .then((res) => {
                    setTag(res.data.tag)
                });
        } catch (error) {
            
        }
      }, [])

    return(
        <div>
            <Link className={styles.tag} to={`/tags/${tagId}`}>{tag && tag.name}</Link>
        </div>

    );
}

export default TagLink;