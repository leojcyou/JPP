import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import "../styles/TopNavBar.css";
import { alignProperty } from '@mui/material/styles/cssUtils';

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
            <Toolbar>
                <Button 
                    onClick={() => nav("/Home")}
                    variant="h6" 
                    component="div" 
                    sx={{ 
                        // flexGrow: 1, 
                        fontFamily: "Times New Roman",
                        fontWeight: 600,
                        bold : true,
                        fontSize: '24px',
                        color: '#3f3430',
                        justifyContent:'left'
                    }}
                >
                    Journal++
                </Button>
                
                { categories.map((category) => 
                    <Button 
                        onClick={() => nav(`/${category.replaceAll(" ", "-")}`)}
                        sx={{ 
                            color: '#3f3430', 
                            fontFamily: 'times new roman',  
                            // fontSize: '16px',
                            fontWeight: 300,
                            // marginLeft: '1%',
                            justifyContent:'right'
                        }}
                        key={category}
                    >
                        {category}
                    </Button>) }
                <Button
                    sx={{ 
                        color: '#3f3430', 
                        fontFamily: 'times new roman',
                        fontSize: '16px',
                        fontWeight: 600,
                        marginLeft: '1%'
                    }}
                    onClick={handleLogOut}
                >
                    Log Out
                </Button>
            </Toolbar>
        </AppBar>
    );
}