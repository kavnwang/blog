import React from 'react'
import axios from "axios";
import { useEffect, useState} from 'react';
import Tag from './Tag';
import { Link } from "react-router-dom";
import styles from '../styles/Hero.module.css'
const Hero = () => {

    return(
       
        <div className={styles.hero} >
<div className={styles.heroLeft}>
    <h1 className={styles.heroText}>Kevin Wang</h1>
    <h3 className={styles.chineseName}>王浩宇</h3>
</div>
<div className={styles.heroRight}>
        <img className={styles.heroImage} src={`/images/hero-image.jpg`} />
</div>

</div>

    );
}

export default Hero;
