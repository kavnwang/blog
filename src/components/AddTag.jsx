import React from 'react'
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import axios from "axios";
import {useEffect, useState, useRef} from 'react';
import TagLink from "./TagLink";
import styles from '../styles/AddTag.module.css'
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
    <div className={styles.editSection}>
      <Display control={control} index={index} />

      <textarea className={styles.tagTextArea}
        {...register(`text`, { required: true })}
      />
      <button
        type="button" 
        className={styles.updateButton}
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
        return <form className={styles.displayWrapper} onSubmit={handleSubmit(onSubmit)}>

          <button
            type="button"
            className={styles.append}
            onClick={() => {
              append({ text: ''});
            }}
          >
            +
          </button>
  
        <input className={styles.submitTags} type="submit" />

          <div className={styles.formWrapper}>
            
            {fields.map((field, index) => (
          <fieldset className={styles.section} key={field.id}>
            <Edit
              control={control}
              update={update}
              index={index}
              value={field}
              className={styles.edit}
            />
            <button
              className={styles.remove}
              type="button"
              onClick={() => remove(index)}
            >
              Remove
            </button>
          </fieldset>
        ))}

</div>
      </form>
  
    } else {
        return <div></div>
    }
}    
    return(
        <div className={styles.displayWrapper}>
            {displayForm()}
        </div>
    );

}

export default AddTag;
