import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';

const Clock = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const formattedTime = currentTime.toLocaleTimeString();

    return (
        <div>
            <Typography  style={{ fontFamily: 'Times New Roman', fontSize: '100px', color:"#3f3430", fontWeight: "400" }}>
                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Typography>
        </div>
    );
};

export default Clock;
