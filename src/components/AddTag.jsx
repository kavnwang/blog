import { useForm , useFieldArray} from "react-hook-form";
import {useState, useEffect} from 'react';
import axios from "axios";
import TagLink from "./TagLink";
import Tag from "./Tag";

function AddTag({postId}) {

    const { register, watch, getValues, useWatch, control, handleSubmit, formState: { isDirty, dirtyFields }, setValue } = useForm();

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
                .post(`${process.env.API_URL}/posts/update/${postId}`, {tags: newTags})
                .then((res) => {setTagObjects(res.data.post.tags)})
                .then(setTags(newTags))
                .then(
                    axios
                        .get(`https://blog-api-lac-alpha.vercel.app/tags/name/${data.name}`)
                        .then((res) => {
                            console.log(res.data);
                            axios.post(`https://blog-api-lac-alpha.vercel.app/tags/${res.data.tags._id}/add/${postId}`);
                        })
                )
        } catch (error) {
            
        }
    };

    useEffect(() => {
        try {
            let getTags = [];
            let getTagObjects = [];
            const postURL = `https://blog-api-lac-alpha.vercel.app/posts/${postId}`;
            axios
                .get(postURL)
                .then((res) => {
                    res.data.post.tags.forEach((tag, index) => {
                        if(tag != null) {

                        axios.get(`https://blog-api-lac-alpha.vercel.app/tags/${tag}`)
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
           {tagObjects.map((tag) => <TagLink tag={tag} />)}
            <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('name')} placeholder='Tag Name' />
            <input type="submit" />
            </form>
        </div>
    )
}

export default AddTag;