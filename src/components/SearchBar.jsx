import React from 'react'
import axios from "axios";
import { useEffect, useState} from 'react';
import PostLink from './PostLink';
import { useForm} from "react-hook-form";
import styles from "../styles/SearchBar.module.css";
const SearchBar = () => {

    const [posts, setPosts] = useState(null);
    const { register, watch, getValues, useWatch, control, handleSubmit, formState: { isDirty, dirtyFields }, setValue } = useForm();

    const onSubmit = () => {

    }
    return(
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input className={styles.search}></input>
            </form>
        </div>

    );
}

export default SearchBar;