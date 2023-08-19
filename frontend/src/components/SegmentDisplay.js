import React from 'react';
import { Box, Button } from '@mui/material';

export default function SegmentDisplay({ segment, segmentID, removeSeg }) {
    const colours = {
        career: "lightpink",
    }

    return (
        <div>
        <Box sx={{
            borderRadius: '10px', // Set the border radius
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Add a shadow
            padding: '12px', // Add some padding for content
            width: '95%',
            maxHeight: 600,
            backgroundColor: "white",
            overflow: "auto",
            marginTop: '2%',
            marginBottom: '2%'  
        }}>{segment.text}</Box>
        <Button 
            variant="outlined"
            size="small"
            onClick={() => removeSeg(segmentID)}
        >Delete Note</Button>
        </div>
    );
}
