import React from 'react'
import axios from "axios";
import styles from '../styles/PhotoForm.module.css'
import {useState} from 'react';
const PhotoForm = () => {

    const [file, setFile] = useState(null); 

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('photo', file); // Use 'photo' as the field name

            axios
                .post(`${import.meta.env.VITE_API_URL}/photos/create`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Set the content type to multipart form data
                    },
                })
                .then((res) => {
                    // Handle the response as needed
                });
        } catch (error) {
            // Handle errors
        }
    };


    return(
        <div>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
}

export default PhotoForm;