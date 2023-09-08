import React from 'react'
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import axios from "axios";
import {useEffect, useState, useRef} from 'react';
import TagLink from "./TagLink";
import styles from '../styles/EditPostText.module.css'
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4 from uuid

const fieldArrayName = 'tags';

const Display = ({ control, index }) => {
  const data = useWatch({
    control,
    name: `${fieldArrayName}.${index}`
  }); 

  if (!data?.text) return null;

  return (
    <div>
      <h3>Submitted Data</h3>
      <p>
        {data?.text}
      </p>
    </div>
  );
};

const Edit = ({ update, index, value, control }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: value
  });

  return (
    <div>
      <Display control={control} index={index} />

      <textarea
        placeholder="enter text"
        {...register(`text`, { required: true })}
      />
      <button
        type="button"
        onClick={handleSubmit((data) => {
          update(index, data);
        })}
      >
        Submit
      </button>
    </div>
  );
};


const AddTag = ({postId}) => {
  const [post, setPost] = useState(null);

  const { control, handleSubmit, register } = useForm();
  const { fields, append, update, remove } = useFieldArray({
    control,
    name: fieldArrayName,
    defaultValues: {
      [fieldArrayName]: []
    }
  });

    
    useEffect(() => {
        try {
          const postURL = `${import.meta.env.VITE_API_URL}/posts/${postId}`;
          axios.get(postURL).then((res) => {
            const tagPromises = res.data.post.tags.map((u) =>
              axios.get(`${import.  meta.env.VITE_API_URL}/tags/${u}`).then((res) => ({
                text: res.data.tag.name,
                id: uuidv4()
              }))
            );
    
            Promise.all(tagPromises).then((tagArray) => {
              setPost(res.data.post);
              tagArray.forEach((u) => {
                append(u);
              });
            });
          });
        } catch (error) {}
      }, []);
    
    const onSubmit = async(data, e) => {        
    try {
        let tagArray = [];
        data.tags.forEach((u) => {
          tagArray.push(u.text);
        });
        axios 
            .post(`${import.meta.env.VITE_API_URL}/posts/update/${postId}`, {tags: tagArray})
            .then(
              (res) => {
                res.data.post.tags.forEach((u) => {
                  axios
                    .post(`${import.meta.env.VITE_API_URL}/tags/${u}/add/${postId}`);
                });
              }
            )
    } catch (error) {
        
    }

    }

function displayForm() {
    if(post) {
      console.log(fields);
        return <form onSubmit={handleSubmit(onSubmit)}>
            {fields.map((field, index) => (
          <fieldset key={field.id}>
            <Edit
              control={control}
              update={update}
              index={index}
              value={field}
            />
            <button
              className="remove"
              type="button"
              onClick={() => remove(index)}
            >
              Remove
            </button>
          </fieldset>
        ))}

          <button
            type="button"
            onClick={() => {
              append({ text: ''});
            }}
          >
            append
          </button>
  
        <input type="submit" />
      </form>
  
    } else {
        return <div></div>
    }
}    
    return(
        <div>
            {displayForm()}
        </div>
    );

}

export default AddTag;
