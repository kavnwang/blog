import React from 'react'
import { useForm , useFieldArray} from "react-hook-form";
import axios from "axios";
import {useEffect, useState, useRef, } from 'react';
import styles from '../styles/SubscribeForm.module.css'

const SubscribeForm = (props) => {


    const onSubmit = async(data, e) => {
        try {
            axios 
                .post(import.meta.env.VITE_FORM_URL, data)
                .then((res) => {console.log(res)});
        } catch (error) {
            
        }
    }

    const { register, watch, getValues, useWatch, control, handleSubmit, formState: { isDirty, dirtyFields }, setValue } = useForm();

    const vals = getValues(["title","author","subtitle","text"]);

    return (
        <div className={styles.formWrapper}>
            <h2>Subscribe Form</h2>
            <form className={styles.formContent} onSubmit={handleSubmit(onSubmit)}>
                <input className={styles.inputForm} placeholder="Enter name..." {...register("name")}/>
                <input className={styles.inputForm} placeholder="Enter email address..."{...register("title")}/>
                <input className={styles.submitButton} type="submit" />
            </form>
        </div>
    );
};

export default SubscribeForm;