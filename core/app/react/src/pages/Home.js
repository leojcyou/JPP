import React, { useEffect, useState } from 'react';
import { TextField, Typography, Button } from '@mui/material';
import { db } from '../config/firebase';
import { collection, addDoc } from "firebase/firestore";

import '../styles/Home.css';

export default function Home() {
  const [note, setNote] = useState("");
  
  const notesCollectionRef = collection(db, "notes");
 
  // we need sentiment before we write to firestore db so these are fake values for now
  const username = "Bob" //TODO CHANGE THIS LATER
  const timestamp = 123456789
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
        userName: username,
        text: note,
        timestamp: timestamp,
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
            Welcome, {"INSERT_USERS_NAME"}
        </Typography>
        <TextField 
            variant="outlined"
            multiline
            style={{ 
              width: '70%',
              backgroundColor: '#f4f1ec',
              marginTop: '2%',
              marginBottom: '2%',
              borderRadius: '5px'
            }}
            inputProps={{ 
              style: { 
                fontSize: '20px',
                border: 'none'
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