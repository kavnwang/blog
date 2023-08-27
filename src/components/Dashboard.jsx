import React from 'react'
import { useForm } from "react-hook-form";
import axios from "axios";
import CreateTagForm from './CreateTagForm';
import CreatePostForm from './CreatePostForm';
import AllPosts from './RecentPosts';
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