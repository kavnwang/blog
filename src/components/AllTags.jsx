import React from 'react'
import axios from "axios";
import { useEffect, useState} from 'react';
import TagLink from './TagLink';
import styles from '../styles/AllTags.module.css';


const AllTags = () => {

    const [tags, setTags] = useState(null);

    useEffect(() => {
        
        try {
            axios 
                .get("http://localhost:3000/tags/view")
                .then((res) => {
                    setTags(res.data.tags)
                    console.log(res.data.tags);
        });
        } catch (error) {
            
        }
        return () => {
            clearInterval();
        }
      
      }, [])
    
    return(
        <div>
            <h2>All Tags</h2>
              <div className={styles.tagWrapper}>{tags && tags.map(tag => <TagLink key={tag._id} tagId={tag._id}  />)} </div>
              
        </div>

    );
}

export default AllTags;
