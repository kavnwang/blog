import React from 'react'
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import axios from "axios";
import {useEffect, useState, useRef} from 'react';
import TagLink from "./TagLink";
import styles from '../styles/EditPostText.module.css'

const AddTag = ({postId}) => {
    const [post, setPost] = useState(null);

    const { control, handleSubmit, register } = useForm();
    const { fields, append, update, remove } = useFieldArray({
      control,
      name: "tags",
      defaultValues: {
        ["tags"]: []
      }
    });
    
    useEffect(() => {
        try {
            const postURL = `${import.meta.env.VITE_API_URL}/posts/${postId}`;
            axios
                .get(postURL)   
                .then((res) => {
                    setPost(res.data.post),
                    res.data.post.tags.forEach((u) => {
                      axios
                      .get(`${import.meta.env.VITE_API_URL}/tags/${u}`)
                      .then((res) => {
                        fields.push({
                          name: res.data.tag.name,
                        })
                      })
                    })
                }
            
                );
        } catch (error) {
            
        }
        
      }, []);

    const onSubmit = async(data, e) => {        
    try {
        let tagArray = [];
        data.tags.forEach((u) => {
          tagArray.push(u.name);
        });
        axios 
            .post(`${import.meta.env.VITE_API_URL}/posts/update/${postId}`, {tags: tagArray})
            .then(
              (res) => {
                res.data.post.tags.forEach((u) => {
                  axios
                    .post(`${import.meta.env.VITE_API_URL}/tags/${u}/add/${postId}`);
                })
              }
            )
    } catch (error) {
        
    }

    }

function displayForm() {
    if(post) {


        return<form onSubmit={handleSubmit(onSubmit)}>
        <ul>
          {fields.map((item, index) => {
            console.log(item);  
            return (
              <li key={item.id}>
                <input
                  {...register(`tags.${index}.name`, {value: item.name}, { required: true })}
                />
  
                <button type="button" onClick={() => remove(index)}>
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
          <button
            type="button"
            onClick={() => {
              append({ name: ''});
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