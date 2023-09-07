import React from 'react'
import axios from "axios";
import {useEffect, useState} from 'react';
import EditPostForm from './EditPostForm';



const CreatePostForm = () => {
    
    const [post, setPost] = useState(null);

    useEffect(() => {
        try {
            const postURL = `${import.meta.env.VITE_API_URL}/posts/create`;
            axios
                .post(postURL,{title: "", author: "", subtitle:"", text:     {
                    nodeType: 'document',
                    content: [],
                }, tags: []})
                .then((res) => {
                    setPost(res.data.post);
                });
        } catch (error) {
            
        }
      }, [])

    function displayForm() {
        if(post) {
            return <div><EditPostForm postId={post._id} /> </div>
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

export default CreatePostForm;


/*
    const { register, control, handleSubmit } = useForm();
    const [width, setWidth] = useState(0);
    const { fields, append, update } = useFieldArray({
        control,
        name: "tags"
    });

    useEffect()

const titleChange = async(data,e) => {

}
const authorChange = async(data,e) => {

}

const subtitleChange = async(data,e) => {

}

const textChange = async(data,e) => {
    
}

const onSubmit = async(data, e) => {
    try {
        axios 
            .post("http://localhost:3000/posts/create", {title: data.title, author: data.author, subtitle:data.subtitle, text: data.text, tags: data.tags})
            .then((res) => {console.log(res)});
    } catch (error) {
        
    }
}

    const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis vel eros donec ac odio tempor orci.";
    
    return(
        <div className={styles.divWrapper} >
            <form className={styles.formWrapper} onSubmit={handleSubmit(onSubmit)}>
            <input placeholder="Enter title..." onChange={titleChange} className={styles.postTitle} {...register("title")} />
            <input placeholder="Kevin Wang" onChange={authorChange} className={styles.postAuthor} {...register("author")} />
            <input placeholder="Enter subtitle..." onChange={subtitleChange} className={styles.subTitle} {...register("subtitle")} />            
            <ul className={styles.tagWrapper}>
                {
                    fields.map((field,index) => (   
                            <AddTag key={field.id}
                            control={control}
                            update={update}
                            index={index}
                            value={field}
                             />
                    )
                    )
                }
            </ul>
            
            <button className={styles.addTag} type="button" onClick={() => append({name: ""})}>+</button>
            <input placeholder={loremIpsum} onChange={textChange}  className={styles.postText} {...register("text")} />
            <input className={styles.submitButton} type="submit" />
        </form>
        </div>
    );

*/