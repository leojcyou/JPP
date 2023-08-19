import React, { useState } from 'react';
import { TextField, Typography, Button } from '@mui/material';
import '../styles/Home.css';
import { db } from '../config/firebase';
import { collection, addDoc } from "firebase/firestore";

export default function Home() {
  const [note, setNote] = useState("");
  
  const notesCollectionRef = collection(db, "notes");

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

  return (
    <div class="container">
        <Typography variant="h5">
            Unpack your thoughts here:
        </Typography>
        <TextField 
            variant="outlined"
            multiline
            fullWidth
            rows={2} 
            value={note}
            onChange={(e) => setNote(e.target.value)}   
        />
        <Button 
            variant="outlined"
            size="large"
            onClick={handleSubmit}
        >Enter</Button>

    </div>
  );
}