import React from 'react'
import axios from "axios";
import { useEffect, useState} from 'react';
import Tag from './Tag';
import { Link } from "react-router-dom";
import styles from '../styles/Footer.module.css'
const Footer = () => {

    return(
        <footer className={styles.footer}>    
            <p className={styles.copyText}>© Copyright Kevin Wang 2023.</p>
        </footer>

    );
}

export default Footer;