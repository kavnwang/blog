import React from 'react'
import axios from "axios";
import { useEffect, useState} from 'react';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';
import styles from '../styles/Nav.module.css'

const Nav = () => {

    
    return(

    <nav className={styles.nav}> 
    <Link to='/'><div className={styles.navLeft}><img className={styles.navImage} src={'/images/name.png'} /></div></Link>
    <ul className={styles.navRight}>
        
        <li className={styles.navLink}><Link to={`/posts/`}>Posts</Link> </li>
        <li className={styles.navLink}><Link to={`/about/`}>About</Link></li>
        <li className={styles.navLink}><Link to={`/photos/`}>Photos</Link></li>
        <li className={styles.navLink}><SearchBar /></li>
    </ul>

    </nav>
        
    );
}

export default Nav;
