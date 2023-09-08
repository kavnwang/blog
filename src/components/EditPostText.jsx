import React from 'react'
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import axios from "axios";
import {useEffect, useState, useRef} from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AddTag from './AddTag';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import styles from '../styles/EditPostText.module.css'


const fieldArrayName = "array";

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
        {data?.text} {data?.marks}
      </p>
    </div>
  );
};

const Edit = ({ update, index, value, control }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: value
  });

  return (
    <div className={styles.editWrapper}>
      <Display control={control} index={index} />

      <textarea
        placeholder="enter text" 
        onInput={(e) => {
          e.target.style.height = "auto";
          e.target.style.height = e.target.scrollHeight + "px";
        }}      
        {...register(`text`, { required: true })}
      />

      <div className={styles.sectionOptions}>
        <select id={styles.select} {...register(`marks`)}>
          <option value='section'>Section</option>
          <option value='paragraph'>Paragraph</option>
          <option value='list'>List</option>
          <option value='latex'>LaTeX</option>
        </select>
      <button
        type="button"
        onClick={handleSubmit((data) => {
          update(index, data);
        })}
      >
        Submit
      </button>
      </div>
    </div>
  );
};


const EditPostText = ({postId}) => {
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
            axios
                .get(postURL)   
                .then((res) => {
                    setPost(res.data.post),
                    res.data.post.text.content.forEach((u) => {
                        append({
                          text: u.value,
                          marks: u.marks.type 
                        });
                        });
                }
                );
        } catch (error) {
            
        }
        
      }, []);

    const onSubmit = async(data, e) => {
        try {
            let document = {
                nodeType: 'document',
                data: {},
                content: [],
              };
            data.array.forEach((u) => {
              console.log(u.marks);
                let mark = '';
                if(u.marks == 'section') {
                    mark = 'bold';
                }
                if(u.marks == 'paragraph') {
                    mark = 'italic';
                }
                if(u.marks == 'list') {
                    mark = 'underline';
                }
                if(u.marks == 'latex') {
                    mark = 'code';
                }
                document.content.push({
                    nodeType: 'text',
                    value: u.text,
                    marks: [{type: mark}]
                });
            });
            
            console.log(document);
              
            axios 
                .post(`${import.meta.env.VITE_API_URL}/posts/update/${postId}`, {...data, text: document})
                .then((res) => {console.log(res)});
        } catch (error) {
            
        }
    }

function displayForm() {
    if(post) {

      console.log(fields);

        return <div className={styles.divWrapper} >
            <form className={styles.formWrapper} onSubmit={handleSubmit(onSubmit)}>
            <textarea defaultValue={post.title} placeholder="Enter title..." className={styles.postTitle} {...register("title")} />
            <textarea defaultValue={post.author} placeholder="Enter author..."  className={styles.postAuthor} {...register("author")} />
            <textarea defaultValue={post.subtitle} placeholder="Enter subtitle..." className={styles.subTitle} {...register("subtitle")} />
        
            {fields.map((field, index) => (
          <fieldset className={styles.fieldset} key={field.id}>
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

        <br />
      <div>
      <button
          type="button"
          className={styles.addSection}
          onClick={() => {
            append({
              text: "",
              marks: "",
              working: false
            });
          }}
        >
          +
        </button>
        <input className={styles.submitButton} type="submit" />

      </div>

        </form>
        </div>
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

export default EditPostText;