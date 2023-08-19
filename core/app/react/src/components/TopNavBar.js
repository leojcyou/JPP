import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import "../styles/TopNavBar.css";

export default function TopNavBar({ categories }) {
    const nav = useNavigate();

    return (
        <AppBar 
            position="static"
            style={{ backgroundColor: '#f4f1ec' }}>
            <Toolbar>
                <Typography 
                    variant="h6" 
                    component="div" 
                    sx={{ 
                        flexGrow: 1, 
                        fontFamily: "EB Garamond",
                        fontWeight: 600,
                        color: '#3f3430'
                    }}
                >
                    Journal++
                </Typography>
                { categories.map((category) => 
                    <Button 
                        onClick={() => nav(`/${category.replaceAll(" ", "-")}`)}
                        sx={{ 
                            color: '#3f3430', 
                            fontFamily: 'EB Garamond',  
                            fontSize: '16px',
                            fontWeight: 600,
                            marginLeft: '1%'
                        }}
                        key={category}
                    >
                        {category}
                    </Button>) }
            </Toolbar>
        </AppBar>
    );
}