import React from 'react'
import Nav from './Nav';
import styles from '../styles/About.module.css';

const About = () => {

    return(
        <div>
            <Nav />
            <div className={styles.aboutContent}>
            <h1>About Me</h1>
            <ul>
                <li>This website is currently a minimum viable product. Things that will hopefully get done in the near future:</li>
                <li>Error handling on forms and on backend</li>
                <li>Date formatting</li>
                <li>Update the "current" section of home easier</li>
                <li>Make cleaner UI, dashboard UI</li>
                <li>Problems with comments: bad UI and auto-refresh</li>
                <li>Login / auth</li>
                <li>Being able to edit comments as owner of blog</li>
                <li>Deleting tags </li>
                <li>Text redndering</li>
                <li>Clean up project file organization</li>
                <li>Better mobile experience</li>
                <li>Fix routers (way to go "back" on nav, etc)</li>
                <li>Create an actual about me page</li>
            </ul>
            </div>
        </div>

    );
}

export default About;