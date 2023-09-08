import React from 'react'
import EditPostText from './EditPostText';
import { Link } from 'react-router-dom';
import AddTag from './AddTag';
import styles from '../styles/EditPostForm.module.css';

const EditPostForm = ({postId}) => {
    return(
        <div>
            <div className={styles.header}>
            <Link className={styles.dashButton} to={`/dash/`}>Dashboard</Link>  
            <AddTag className={styles.tagForm} postId={postId} />
            </div>

            <EditPostText postId={postId} />
        </div>
    );

}

export default EditPostForm;