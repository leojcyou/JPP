import React, { useState } from 'react';
import { IconButton, Icon, Button, Input, TableRow, TableCell, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function SegmentDisplay({ segment, updateSeg, removeSeg }) {
    const [paragraphText, setParagraphText] = useState(segment.text)
    const [editMode, setEditMode] = useState(false);
    
    return (
        <TableRow key={segment.text}>
        <TableCell component="th" scope="row">
            { !editMode && <Typography>{segment.text}</Typography> }
            { editMode && (
                <div>
                    <Input 
                        value={paragraphText}
                        onChange={(e) => setParagraphText(e.target.value)}
                        sx={{ width: '90%' }}
                    /> 
                    <IconButton onClick={() => {
                        updateSeg(segment.id, paragraphText)
                        setEditMode(false)
                    }}>
                        <ArrowForwardIcon />
                    </IconButton>
                </div> )}           
        </TableCell>
        <TableCell align="right">{segment.sentiment}</TableCell>
        <TableCell align="right">{new Date(segment.timestamp * 1000).toLocaleDateString("en-GB")}</TableCell>
        <TableCell align="right">
            <IconButton onClick={() => setEditMode(!editMode)}>
                <EditIcon />
            </IconButton>  
        </TableCell>
        <TableCell align="right">
          <IconButton onClick={() => removeSeg(segment.id)}>
            <DeleteForeverIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    );
}