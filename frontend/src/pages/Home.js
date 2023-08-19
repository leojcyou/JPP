import React from 'react';
import { TextField, Typography, Button } from '@mui/material';
import '../styles/Home.css';

export default function Home() {
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
        />
        <Button 
            variant="outlined"
            size="large"
        >Enter</Button>

    </div>
  );
}