import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { db } from '../config/firebase';
import { collection, addDoc } from "firebase/firestore";
import { UserAuth } from '../contexts/AuthContext';
import RoundedSquareBox from '../components/roundedbox';
import Clock from '../components/clock';

import '../styles/Home.css';

const Home = () => {
    const { user } = UserAuth();
    const notesCollectionRef = collection(db, "notes");
    const sentiment = "sad";

    const [note, setNote] = useState("");

    const handleSubmit = async () => {
        const response = await fetch("http://127.0.0.1:8000/classification/", {
            method: "POST",
            body: JSON.stringify({
                text: note,
            })
        });

        const json = response.json();
        console.log(json);

        try {
            await addDoc(notesCollectionRef, {
                userName: user.email,
                text: note,
                timestamp: Math.floor(new Date().getTime() / 1000),
                sentiment: sentiment,
            });
            setNote("");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container">

            <Typography
                variant="h1"
                className="welcome-message"
                sx={{
                    fontSize: "36px",
                    fontFamily: "times new roman",
                    fontWeight: "500",
                    color: "#3f3430",
                    paddingBottom: "0px"
                }}>
                Welcome, {user.displayName ? user.displayName : "Person"}
            </Typography>
            <Clock sx={{paddingTop:"0px"}}></Clock>
            <RoundedSquareBox value={note} onChange={(e) => setNote(e.target.value)} />
        </div>
    );
};

export default Home;
