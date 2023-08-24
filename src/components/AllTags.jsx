import React from 'react'
import axios from "axios";
import { useEffect, useState} from 'react';
import TagLink from './TagLink';


const AllTags = () => {

    const [tags, setTags] = useState(null);

    useEffect(() => {
        
        try {
            axios 
                .get("http://localhost:3000/tags/view")
                .then((res) => {
                    setTags(res.data.tags)
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
              {tags && tags.map(tag => <TagLink key={tag._id} tag={tag}  />)} 
              
        </div>

    );
}

export default AllTags;
