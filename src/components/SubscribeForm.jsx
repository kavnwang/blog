import React from 'react'
import { useForm , useFieldArray} from "react-hook-form";
import axios from "axios";
import {useEffect, useState, useRef, } from 'react';
import styles from '../styles/SubscribeForm.module.css'

const SubscribeForm = () => {

    const [display, setDisplay] = useState(true);

    const onSubmit = async(data, e) => {
        try {
            axios 
                .post(`https://api.convertkit.com/v3/forms/${import.meta.env.VITE_FORM_ID}/subscribe`, {
                    "api_key": import.meta.env.VITE_FORM_API_KEY,
                    "email": data.email,
                },
                )
                .then(setDisplay(false))
        } catch (error) {
            
        }
    }

    const { register, watch, getValues, useWatch, control, handleSubmit, formState: { isDirty, dirtyFields }, setValue } = useForm();

    function displayForm() {
        if(display) {
            return <div className={styles.formWrapper}>
            <h2 className={styles.formTitle}>Subscribe Form</h2>
            <form className={styles.formContent} onSubmit={handleSubmit(onSubmit)}>
                <input className={styles.inputForm} placeholder="Enter email address..."{...register("email")}/>
                <input className={styles.submitButton} type="submit" />
            </form>
            </div>
        } else {
            return <div>
                <p>Please check your email to verify your subscription. </p>
            </div>
        }
    }

    return (
        <div>
            {displayForm()}
        </div>
    );
};

export default SubscribeForm;