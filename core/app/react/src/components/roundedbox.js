import React from 'react';
import {styled, TextField, Button, IconButton, ThemeProvider} from '@mui/material';


const CustomTextField = styled(TextField)(({ theme }) => ({
    '& .MuiInput-underline:before': {
        borderBottomColor: '#3f3430', // Change the underline color
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#6D712E', // Change the underline color when focused
    },
}));

const RoundedSquareBox = ({ value, onChange, onEnter }) => {
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
                value={value}
                onChange={onChange}
            />
            <Button variant="contained"  style={{marginTop: '10px',alignSelf: 'flex-end',backgroundColor: '#6D712E', fontFamily: "times new roman"}}>
                Add
            </Button>
        </div>

    );
};

export default RoundedSquareBox;
