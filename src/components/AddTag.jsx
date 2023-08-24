import { useForm , useFieldArray} from "react-hook-form";
import {useState} from 'react';

function AddTag({update, index, value, control}) {

    const { register, handleSubmit } = useForm(
        {defaultValues: value});

    return(
        <div>
            <input {...register('name')} placeholder='Tag Name' />
            <button type="button" onClick={handleSubmit((data) => update(index,data))}>Submit</button>
        </div>
    )
}

export default AddTag;