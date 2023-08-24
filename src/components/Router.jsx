import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import Dashboard from './Dashboard.jsx'
import AllPosts from './AllPosts.jsx'
import Post from './Post.jsx';
import EditPostLink from './EditPostLink.jsx';
import Tag from './Tag.jsx';
import CreatePostForm from './CreatePostForm.jsx';

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
          path:"/posts/:postId",
          element: <Post />
        },
        {
          path:"/posts/:postId/edit",
          element: <EditPostLink />
        },
        
        {
          path: "/posts/recent",
          element: <AllPosts />
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