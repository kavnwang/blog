import React from 'react'
import EditPostText from './EditPostText';
import { Link } from 'react-router-dom';
import AddTag from './AddTag';


const EditPostForm = ({postId}) => {
    return(
        <div>
            <Link to={`/dash/`}>Dashboard</Link>
            <AddTag postId={postId} />
            <EditPostText postId={postId} />
        </div>
    );

}

export default EditPostForm;