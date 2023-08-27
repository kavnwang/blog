import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import Dashboard from './Dashboard.jsx'
import RecentPosts from './RecentPosts.jsx'
import Post from './Post.jsx';
import EditPostLink from './EditPostLink.jsx';
import Tag from './Tag.jsx';
import CreatePostForm from './CreatePostForm.jsx';
import Posts from './Posts.jsx'
import About from './About.jsx'
import Photos from './Photos.jsx';

function Router() {
    const router = createBrowserRouter([
        {
          path: "/",
          element: <App />,
        },
        {
          path: "/dash",
          element: <Dashboard />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/posts",
          element: <Posts />
        },
        {
          path: "/photos",
          element: <Photos />
        },
        {
          path:"/posts/:postId",
          element: <Post />
        },
        {
          path:"/posts/:postId/edit",
          element: <EditPostLink />
        },
        
        {
          path: "/posts/recent",
          element: <RecentPosts/>
        },
        {
          path: "/posts/create",
          element: <CreatePostForm />
        },
        {
          path: "/tags/:tagId",
          element: <Tag />
        }
      ]);

    return <RouterProvider router={router} />;
}

export default Router;