import React, { useEffect, useState } from 'react';
import { TextField, Typography, Button } from '@mui/material';
import WebFont from 'webfontloader';
import { useNavigate } from 'react-router-dom';
import { db } from '../config/firebase';
import { collection, addDoc } from "firebase/firestore";

import '../styles/Home.css';
import Category from "../pages/Category";

export default function Home() {
  const [note, setNote] = useState("");
  
  const notesCollectionRef = collection(db, "notes");
  const nav = useNavigate();

  // we need sentiment before we write to firestore db so these are fake values for now
  const username = "Bob" //TODO CHANGE THIS LATER
  const timestamp = 123456789
  const sentiment = "sad"

  const handleSubmit = async () => {
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

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['EB Garamond']
      }
    });
  }, []);

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
              width: '80%',
              backgroundColor: 'white',
              marginTop: '2%',
              marginBottom: '2%',
              borderRadius: '5px'
              // '& .MuiOutlinedInput-root': {
              //   borderRadius: '20px !important', // Adjust the border radius for the outline
              // }
            }}
            inputProps={{ style: { 
              fontSize: '20px' 
            }}}
            rows={5}
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
        <Button onClick={() => nav('/career')}>
            Click me to go to career
        </Button>
    </div>
  );
}