import { useForm} from "react-hook-form";
import {useState, useEffect} from 'react';
import axios from "axios";
import TagLink from "./TagLink";

function AddTag({postId}) {

    const { register, handleSubmit} = useForm();

    const [tags, setTags] = useState([]);
    const [tagObjects, setTagObjects] = useState([]);

    const onSubmit = async(data, e) => {
        let newTags = [];
        tags.forEach((u) => {
            newTags.push(u);
        })
        newTags.push(data.name);

        try {
            axios 
                .post(`${import.meta.env.VITE_API_URL}/posts/update/${postId}`, {tags: newTags})
                .then((res) => {setTagObjects(res.data.post.tags)})
                .then(setTags(newTags))
                .then(
                    axios
                        .get(`${import.meta.env.VITE_API_URL}/tags/name/${data.name}`)
                        .then((res) => {
                            console.log(res.data);
                            axios.post(`${import.meta.env.VITE_API_URL}/tags/${res.data.tags._id}/add/${postId}`);
                        })
                )
        } catch (error) {
            
        }
    };

    useEffect(() => {
        try {
            let getTags = [];
            let getTagObjects = [];
            const postURL = `${VITE_API_URL}/posts/${postId}`;
            axios
                .get(postURL)
                .then((res) => {
                    res.data.post.tags.forEach((tag) => {
                        if(tag != null) {

                        axios.get(`${VITE_API_URL}/tags/${tag}`)
                        .then((res) => {
                            getTags.push(res.data.tag.name);
                            getTagObjects.push(res.data.tag);
                        })
                        }
                        
                      });
                    setTags(getTags);
                    setTagObjects(getTagObjects);
                });
        } catch (error) {
            
        }
        
      }, []);

    return(
        <div>
           {tagObjects.map((tag) => <TagLink key={tag} tag={tag} />)}
            <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('name')} placeholder='Tag Name' />
            <input type="submit" />
            </form>
        </div>
    )
}

export default AddTag;