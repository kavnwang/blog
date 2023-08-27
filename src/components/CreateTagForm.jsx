import React from 'react'
import { useForm } from "react-hook-form";
import axios from "axios";


const CreateTagForm = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = async(data, e) => {
        try {
            axios 
                .post("http://localhost:3000/tags/create", {name: data.name})
                .then((res) => {console.log(res)});
        } catch (error) {
            
        }
    }

    return(
        <div>
        <h2>Create Tag</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor='name'>name</label>
            <input {...register("name")} />

            <input type="submit" />
        </form>
        </div>
    );
}

export default CreateTagForm;