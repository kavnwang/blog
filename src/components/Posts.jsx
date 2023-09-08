import React from 'react'
import { useEffect, useState, useRef} from 'react';
import RecentPosts from './RecentPosts';
import AllTags from './AllTags';
import PopularPosts from './PopularPosts';
import { useForm } from "react-hook-form";
import Nav from './Nav';
import styles from '../styles/Posts.module.css'
const Posts = () => {

    const [select, setSelect] = useState("recent");
    const [num, setNum] = useState(-1);

    const { register, watch, getValues, handleSubmit, setValue } = useForm();

    const vals = getValues(["number"]);

    useEffect(() => {
        const watchFields = watch((data) => {
        if(data.number > 0) {
            setNum(data.number);
        } else {
            setNum(-1);
        }

    });
        return () => watchFields.unsubscribe()
        }
  , [vals]);

    function displayPosts() {
        if(select == "recent") {
            
            return <RecentPosts num={num}/>
        } else if(select == "popular") {
            return <PopularPosts num={num}/>
        } else if(select == "tag") {
            return <AllTags />
        }
    }

    const setRecent = () => {
        setSelect("recent");
    }
    const setPopular = () => {
        setSelect("popular");
    }
    const setTag = () => {
        setSelect("tag");
    }

    const onSubmit = (data,e) => {
        setValue('number',num);
        setNum(data.number);
    }

    return(
        <div className={styles.formBar}>
            <Nav />
            <form onSubmit={handleSubmit(onSubmit)} >
            <p className={styles.results}>Showing <input placeholder="all" className={styles.inputNum} {...register("number")} /> results</p>
            </form>
            <div className={styles.buttonBar}>
            <button className={`${styles.button} ${select == "recent" ? styles.selected : ""}`} onClick={setRecent}>Recent</button>
            <button className={`${styles.button} ${select == "popular" ? styles.selected: ""}`} onClick={setPopular}>Popular</button>
            <button className={`${styles.button} ${select == "tag" ? styles.selected : ""}`} onClick={setTag}>Tag</button>
            </div>
              {displayPosts()}
        </div>

    );
}

export default Posts;
