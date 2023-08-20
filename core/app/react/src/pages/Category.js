import React, { useState, useEffect } from 'react';
import { Typography, Box, Grid, Autocomplete, TextField } from '@mui/material';
import { Dropdown } from '@mui/base';
import '../styles/Category.css';
import SegmentDisplay from '../components/SegmentDisplay';
import { db } from '../config/firebase';
import { getDocs, deleteDoc, updateDoc, collection, doc, query, where } from "firebase/firestore"
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button } from '@mui/material';
import { UserAuth } from '../contexts/AuthContext';

const stylesTableContainer = {
  borderRadius: '15px', // Adjust the radius as needed
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Add a shadow
  backgroundColor:'#f4f1ec',
};

const stylesTableHead = { 
  fontSize: "18px", 
  color: "#3f3430", 
  fontFamily: "Times new roman",  
  fontWeight: 800
}

export default function Category({ categories, category }) {
  const [ segments, setSegments ] = useState([]);
  const { user } = UserAuth();

  const notesCollectionRef = collection(db, "notes");

  const getNotesList = async () => {
    try {
      const data = await getDocs(notesCollectionRef);

      data.docs.forEach((each) => {
        console.log("each data", each.data())
      })

      const filteredData = data.docs.filter((each) => each.data().userName === user.email && each.data().category === category)
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })
      );

      console.log("filteredData is", filteredData);
      
      setSegments(filteredData);
    } 
    
    catch (err) {
      console.error(err);
    }

    console.log("getNotesList ran to completion");
  };
  const [ selected, setSelected ] = useState([]);

  // useEffect here to pull from db and place into segments
  useEffect(() => {
    console.log("useEffect called");
    getNotesList();
  }, [category])

  const deleteSegment = async (id) => {
    console.log("deleting ", id)
    const notesDoc = doc(db, "notes", id);
    await deleteDoc(notesDoc);

    setSegments((prevSegments) => {
      const newSegments = [...segments];
      const indexToDelete = newSegments.findIndex((segment) => segment.id === id);

      if (indexToDelete !== -1) {
        newSegments.splice(indexToDelete, 1);
        
        return newSegments;
      }

      else
        return prevSegments;
    })
  };

  const updateSegment = async (id, paragraph) => {
    console.log("updating ", id)
    const notesDoc = doc(db, "notes", id);
    await updateDoc(notesDoc, { text: paragraph });

    const newSegments = [...segments];
    const toUpdate = newSegments.find((segment) => segment.id === id);

    if (toUpdate)
      toUpdate.text = paragraph;

    setSegments(newSegments);
  };

  return (
    <div class="container">
      <Typography 
        fontSize="50px" 
        fontFamily="times new roman" 
        color="#3f3430" 
        padding="30px"
      >
        {category}
      </Typography>
      <Box>
      <Autocomplete
          multiple
          sx={{
            padding: '10px',
            '& .MuiInput-underline:before': {
              borderBottomColor: '#3f3430',
            },
            '& .MuiInput-underline:after': {
              borderBottomColor: '#6D712E',

          },
          }}
          options={['Sadness', 'Joy', 'Love', 'Anger', 'Fear', 'Surprise']}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Filter by sentiment below:"
            />
          )}
          onChange={(event, newVal) => setSelected(newVal)}

        />
        <TableContainer 
          component={Paper} 

          sx={stylesTableContainer}
        >
          <Table 
            sx={{ 
              minWidth: 1000,
              overflow: "auto"
            }} 
            fontFamily="times new roman"
          >
            <TableHead>
              <TableRow>
                <TableCell sx={stylesTableHead}>Entries</TableCell>
                <TableCell sx={stylesTableHead} align="right">Sentiment</TableCell>
                <TableCell sx={stylesTableHead} align="right">Date</TableCell>
                <TableCell sx={stylesTableHead} align="right">
                  Edit
                </TableCell>
                <TableCell sx={stylesTableHead} align="right">
                  Remove
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {segments.filter((segment) => {
                if (selected.length === 0)
                  return true;

                for (let i = 0; i < selected.length; i++) {
                  if (selected[i] === segment.sentiment)
                    return true;
                }

                return false;
              }).map((segment) => (
                <SegmentDisplay 
                  segment={segment} 
                  key={segment.id} 
                  updateSeg={updateSegment} 
                  removeSeg={deleteSegment}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}