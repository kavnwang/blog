import React from 'react'
import CreateTagForm from './CreateTagForm';
import AllTags from './AllTags';
import PublishedPosts from './PublishedPosts';
import UnpublishedPosts from './UnpublishedPosts';
import CreatePostButton from './CreatePostButton';
import Nav from './Nav';
import PhotoForm from './PhotoForm';

const Dashboard = () => {
    return(
        <div>
            <Nav />
            <CreatePostButton />
            <PublishedPosts />
            <UnpublishedPosts />
            <AllTags />
            <PhotoForm />
            <CreateTagForm />

        </div>
    );
}

export default Dashboard;