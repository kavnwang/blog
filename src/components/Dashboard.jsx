import React from 'react'
import CreateTagForm from './CreateTagForm';
import AllTags from './AllTags';
import PublishedPosts from './PublishedPosts';
import UnpublishedPosts from './UnpublishedPosts';
import CreatePostButton from './CreatePostButton';
import Nav from './Nav';

const Dashboard = () => {
    return(
        <div>
            <Nav />
            <CreatePostButton />
            <PublishedPosts />
            <UnpublishedPosts />
            <AllTags />

            <CreateTagForm />

        </div>
    );
}

export default Dashboard;