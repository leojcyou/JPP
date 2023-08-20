import React, { useState } from 'react';
import { styled, TextField, Button, IconButton, ThemeProvider } from '@mui/material';
import { UserAuth } from '../contexts/AuthContext';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../config/firebase';

const CustomTextField = styled(TextField)(({ theme }) => ({
    '& .MuiInput-underline:before': {
        borderBottomColor: '#3f3430', // Change the underline color
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#6D712E', // Change the underline color when focused
    },
}));

const RoundedSquareBox = ({ value, onChange, onEnter }) => {
    const [ note, setNote ] = useState("");
    const { user } = UserAuth();
    const notesCollectionRef = collection(db, "notes");

    const handleSubmit = async () => {
        console.log("button clicked")

        const noteCopy = note;
        setNote("");

        const response = await fetch("http://127.0.0.1:8000/classification/", {
            method: "POST",
            body: JSON.stringify({
                text: noteCopy,
            })
        });

        const json = await response.json();
        console.log(json.data);

        json.data.forEach(async (each) => {
            try {
                await addDoc(notesCollectionRef, {
                    userName: user.email,
                    text: each.text,
                    timestamp: Math.floor(new Date().getTime() / 1000),
                    category: each.category,
                    sentiment: each.sentiment
                });
            } 
            
            catch (err) {
                console.error(err);
            }
        });

        // try {
        //     await addDoc(notesCollectionRef, {
        //         userName: user.email,
        //         text: note,
        //         timestamp: Math.floor(new Date().getTime() / 1000),
        //         sentiment: sentiment,
        //     });
        //     setNote("");
        // } 
        
        // catch (err) {
        //     console.error(err);
        // }
    };

    return (
        <div style={{
            backgroundColor: '#f4f1ec',
            borderRadius: '15px',
            padding: '20px',
            width: '70%',
            margin: '0 auto',
            marginTop: '2%',
            marginBottom: '2%',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            display: 'flex', // Use flex display for horizontal alignment
            flexDirection: 'column', // Arrange children vertically
            alignItems: 'stretch', // Stretch items to the full width
        }}>
            <CustomTextField
                variant="standard"
                padding="20px"
                multiline
                fullWidth
                inputProps={{
                    style: {
                        fontFamily: "times new roman",
                        fontSize: '18px',
                        border: 'none',  // Remove the border
                    }
                }}
                rows={10}
                placeholder={"Unpack your thoughts here..."}
                value={note}
                onChange={(e) => setNote(e.target.value)}
            />
            <Button 
                variant="contained"
                onClick={handleSubmit}  
                style={{
                    marginTop: '10px',
                    alignSelf: 'flex-end',
                    backgroundColor: '#6D712E', 
                    fontFamily: "times new roman"
                }}
            >
                Add
            </Button>
        </div>

    );
};

export default RoundedSquareBox;
