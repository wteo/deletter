import React from 'react';

import style from './About.module.scss'

function About() {
    return (
        <div id={style.about}>
            <h1>Welcome to DeLetter!</h1>
            <p>With 10 years of experience in credit control and a passion for web development, 
                I saw an opportunity to combine my professional experience and self-taught programming skills to 
                create a useful tool for others.
            </p>
            <p>DeLetter allows users to easily create a professional and legally-sound demand letter in just a few steps.
                It also keeps track of overdue invoices and the status of the demand letter. Whether you are trying to collect a debt, 
                resolve a contract dispute, or address any other legal issue, DeLetter has you covered.
            </p>
            <p>I used a variety of tools to develop DeLetter, including CSS and Sass for design, React as the UI framework, 
                Jest and React Testing Library for testing, and TypeScript as the main programming language. 
                The database I used is Firebase. I have incorporated features such as a preview function and the ability 
                to send or download the letter, all with the goal of making the process of creating a demand letter 
                as seamless and straightforward as possible.
            </p>
            <p>My background in credit control has given me a deep understanding of the importance of effective debt collection, 
                and I hope that DeLetter will be a valuable resource for others in similar roles. 
            </p>
            <p>Thank you for checking out DeLetter.</p>
        </div>
    );
}

export default About;