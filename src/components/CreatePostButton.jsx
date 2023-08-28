import React from 'react'
import { Link } from "react-router-dom";

const CreatePostButton = () => {

    return(
        <div>
             <Link to={"/posts/create"}>
                Create Post
             </Link>
        </div>

    );
}

export default CreatePostButton;