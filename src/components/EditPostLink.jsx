import React from 'react'
import { useForm , useFieldArray} from "react-hook-form";
import axios from "axios";
import {useEffect, useState} from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AddTag from './AddTag';
import { useParams } from 'react-router-dom';
import EditPostForm from './EditPostForm';

const EditPostLink = () => {
    const {postId} = useParams();
    return(
        <EditPostForm postId={postId} />
    )
}

export default EditPostLink;