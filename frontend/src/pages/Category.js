import React, { useState, useEffect } from 'react';
import { Typography, Box, Grid, Autocomplete, TextField } from '@mui/material';
import { Dropdown } from '@mui/base';
import '../styles/Category.css';
import SegmentDisplay from '../components/SegmentDisplay';
import { db } from '../config/firebase';
import { getDocs, collection } from "firebase/firestore"

export default function Category({ categories, category }) {
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
  
  const notesCollectionRef = collection(db, "notes");

  const getMovieList = async () => {
    try {
      const data = await getDocs(notesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setSegments(filteredData);
    } catch (err) {
      console.error(err);
    }
  };
  const [ selected, setSelected ] = useState([]);

  // useEffect here to pull from db and place into segments
  useEffect(() => {
    getMovieList();
  }, [segments])

  return (
    <div>
      <Typography variant="h6">Category chosen:</Typography>
      <Typography variant="h5">{category}</Typography>
      <Dropdown defaultOpen></Dropdown>
      <Typography>state is {selected}</Typography>
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
        <Autocomplete
          multiple
          options={['anger', 'sadness']}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Filter by sentiment below:"
              placeholder="all"
            />
          )}
          onChange={(event, newVal) => setSelected(newVal)}
        />
        { segments.filter((segment) => {
          if (selected.length === 0)
            return true;
            
          for (let i = 0; i < selected.length; i++) {
            if (selected[i] === segment.sentiment)
              return true;
          }

          return false;
        }).map((filteredSegment) => <SegmentDisplay segment={filteredSegment}/>) }
      </Box>
    </div>
  );
}