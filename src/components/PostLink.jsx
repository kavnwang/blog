import React from 'react'
import axios from "axios";
import { useEffect, useState} from 'react';
import Post from './Post';
import { Link } from "react-router-dom";

function PostLink(props) {

    return(
        <div>
             <Link to={"/posts/" + props._id}>
                {props.title}
             </Link>
        </div>

    );
}

export default PostLink;