import React from 'react'

function TodayDate() {
    
    const today = new Date();
    const todayString = today.toString();
    const todayArr = todayString.split(' ');    
    
    const day: string = todayArr[2];
    const month: string = todayArr[1];
    const year: string = todayArr[3];
    const date = `${day} ${month}, ${year}`;

    return <p>{date}</p>;
}

export default TodayDate;