import React, { useState } from 'react';
import { Typography, Box, Grid } from '@mui/material';
import '../styles/Category.css';
import SegmentDisplay from '../components/SegmentDisplay';

export default function Category({ category }) {
  const [ segments, setSegments ] = useState([
    {
      text: "that bitch carol at work was so annoying",
      timestamp: 123456,
      sentiment: "anger"
    },
    {
      text: "i wish i was better at among us",
      timestamp: 654321,
      sentiment: "sadness"
    },
  ]);

  // useEffect here to pull from db and place into segments

  return (
    <div>
      <Typography variant="h6">Category chosen:</Typography>
      <Typography variant="h6">{category}</Typography>
      <Box sx={{
        borderRadius: '10px', // Set the border radius
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Add a shadow
        padding: '20px', // Add some padding for content
        width: 500,
        maxHeight: 600,
        backgroundColor: "lightblue",
        overflow: "auto",
        justifyContent: 'center',
        alignItems: 'center'  
      }}>
        { segments.map((segment) => <SegmentDisplay segment={segment}/>) }
      </Box>
    </div>
  );
}