import React from 'react'
import axios from "axios";
import { useEffect, useState} from 'react';
import Tag from './Tag';
import { Link } from "react-router-dom";

function TagLink(props) {

    return(
        <div>
             <Link to={"/tags/" + props.tag._id}>
                {props.tag.name} with {props.tag.color}
             </Link>
        </div>

    );
}

export default TagLink;