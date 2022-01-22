import React, { useEffect, useState } from "react";

function ClockA() {
    const [currentDate, setCurrentDate] = useState(new Date());
    setInterval(() => { setCurrentDate(new Date()) }, 1000);

    return (
        <div>
            <span>The current time is: {currentDate.toString()}</span>
        </div>);
}

function Clock() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        let setTime = () => {
            console.log("clock: setTime \'effect\' called")
            setCurrentTime(new Date())
        }
        let interval = setInterval(setTime, 1000);

        return ()=> {
            console.log("clock: clearInterval")
            clearInterval(interval)
        }

    }, []);


    return (<span>The current time is: {currentTime.toString()}</span>);
}

export default Clock;