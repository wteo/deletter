import React from 'react'

import styles from './Footer.module.scss';

function Footer() {
    return (
        <footer className={styles.footer} aria-label='footer'>
            <p>© Deletter 2022 . Design by Wendy Teo</p>
        </footer>
    );
}

export default Footer;

