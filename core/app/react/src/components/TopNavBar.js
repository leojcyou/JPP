import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import "../styles/TopNavBar.css";

export default function TopNavBar({ categories }) {
    const nav = useNavigate();

    const handleLogOut = async () => {
        try {
            // await logout(); // FOR SOME REASON THIS DOES NOT WORK
            nav('/Signin');
            console.log('You are logged out')
        } catch (e) {
            console.log(e.message);
        }
    };

    return (
        <AppBar
            position="static"
            style={{ backgroundColor: '#f4f1ec' }}>
            <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                    onClick={() => nav("/Home")}
                    variant="h6"
                    component="div"
                    sx={{
                        fontFamily: "Times New Roman",
                        fontWeight: 400,
                        fontSize: '24px',
                        color: '#3f3430',
                    }}
                >
                    Journal++
                </Button>

                <div>
                    { categories.map((category) =>
                        <Button
                            onClick={() => nav(`/${category.replaceAll(" ", "-")}`)}
                            sx={{
                                color: '#3f3430',
                                fontFamily: 'times new roman',
                                fontWeight: 300,
                            }}
                            key={category}
                        >
                            {category}
                        </Button>) }
                    <IconButton variant="contained"  style={{marginTop: '10px',alignSelf: 'flex-end', fontFamily: "times new roman"}}>

                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
    );
}
//  <Button
//                        sx={{
//                            color: '#3f3430',
//                            fontFamily: 'times new roman',
//                            fontSize: '16px',
//                            fontWeight: 600,
//                            marginLeft: '1%'
//                        }}
//                        onClick={handleLogOut}
//                    >
//                        Log Out
//                    </Button>