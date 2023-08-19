import React, { useEffect, useState } from 'react';
import { TextField, Typography, Button } from '@mui/material';
import { db } from '../config/firebase';
import { collection, addDoc } from "firebase/firestore";
import { UserAuth } from '../contexts/AuthContext';

import '../styles/Home.css';

const stylesContainer = {
  borderRadius: '15px', // Adjust the radius as needed
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Add a shadow
};

export default function Home() {
  const [note, setNote] = useState("");
  const { user } = UserAuth();
  
  console.log("userauth: ", UserAuth())

  const notesCollectionRef = collection(db, "notes");
 
  // we need sentiment before we write to firestore db so these are fake values for now
  const sentiment = "sad"

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
    <div class="container">
        <Typography 
          variant="h1"
          class="welcome-message">
            Welcome, {user.displayName ? user.displayName : "Person"}
        </Typography>
        <TextField 
            variant="outlined"
            multiline
            style={{ 
              width: '70%',
              backgroundColor: '#f4f1ec',
              marginTop: '2%',
              marginBottom: '2%',
              borderRadius: '25px'
              
            }}
            inputProps={{ 
              style: { 
                fontSize: '24px',
              }
            }}
            rows={12}
            placeholder={"Unpack your thoughts here..."}
            value={note}
            onChange={(e) => setNote(e.target.value)}
        />
        <Button 
            // class="enter-button"
            variant="contained"
            size="large"
            color="success"
            onClick={handleSubmit}
        >Enter</Button>
    </div>
  );
}