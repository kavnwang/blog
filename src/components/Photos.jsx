import React from 'react'
import axios from "axios";
import { useEffect, useState} from 'react';
import Tag from './Tag';
import { Link } from "react-router-dom";
import Header from './Nav';
import Nav from './Nav';
import styles from '../styles/Photo.module.css'

const Photos = () => {

    const [photos, setPhotos] = useState(null);

    useEffect(() => {
        
        try {
            axios 
                .get(`${import.meta.env.VITE_API_URL}/photos/`)
                .then((res) => {
                    setPhotos(res.data.photos);
                })
        } catch (error) {
            
        }
        return () => {
            clearInterval();
        }
      
      }, [])

    return(
        <div>
            <Nav />
            <div>
      <div className={styles.photoContainer}>
        {photos && photos.map((photo) => (
          <div className={styles.photoWrapper} key={photo._id}>
            
            <img className={styles.photo}src={`data:${photo.contentType};base64,${btoa(new Uint8Array(photo.data.data).reduce(function (data, byte) {
    return data + String.fromCharCode(byte);
}, ''))}`} />
          </div>
          
        ))}
      </div>
    </div>

        </div>

    );
}

export default Photos;

/* 
*/