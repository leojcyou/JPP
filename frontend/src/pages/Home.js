import React, { useState } from 'react';
import { TextField, Typography, Button } from '@mui/material';
import '../styles/Home.css';
// import { db } from '../config/firebase';
// import { addDoc, collection } from "firebase/firestore";

export default function Home() {
  const [note, setNote] = useState("");
  
  // const notesCollectionRef = collection(db, "notes");

  // const username = "Bob" //TODO CHANGE THIS LATER
  // const timestamp = 123456789

  // const handleSubmit = async () => {
  //   try {
  //     await addDoc(notesCollectionRef, {
  //       userName: username,
  //       text: note,
  //       timestamp: timestamp,
  //       userId: auth?.currentUser?.uid,
  //     });
  //     getMovieList();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

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
            onChange={(e) => setNote(e.target.value)}   
        />
        <Button 
            variant="outlined"
            size="large"
            // onClick={handleSubmit}
        >Enter</Button>

    </div>
  );
}