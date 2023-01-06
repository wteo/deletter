import React from 'react'

function TodayDate() {
    
    const today = new Date();
    const year = today.getFullYear();
    const month = today.toLocaleString('default', { month: 'long' });
    const day = String(today.getDate()).padStart(2, '0');
    const date = `${day} ${month}, ${year}`;

    return <p>{date}</p>;
}

export default TodayDate;