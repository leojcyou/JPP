import React, { useState } from 'react';
import { Box, Button, Input, TableRow, TableCell, Typography } from '@mui/material';

export default function SegmentDisplay({ segment, updateSeg, removeSeg }) {
    const [paragraphText, setParagraphText] = useState(segment.text)
    const [editMode, setEditMode] = useState(false);
    
//     const handleEditClick = () => {
//         setEditMode(true);
//     };
    
//     const handleSaveClick = () => {
//         setEditMode(false);
//         updateSeg(segmentID, paragraphText)
//     };

//     return (
//         <div>
//             {/* <Box sx={{
//                     borderRadius: '10px', // Set the border radius
//                     boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Add a shadow
//                     padding: '20px', // Add some padding for content
//                     width: '95%',
//                     maxHeight: 600,
//                     backgroundColor: "white",
//                     overflow: "auto",
//                     marginTop: '2%',
//                     marginBottom: '2%'  
//                 }}> */}
//                 {editMode ? (
//                     <Input 
//                         value={paragraphText}
//                         onChange={(e) => setParagraphText(e.target.value)}>
//                     </Input>
//                 ) : (
//                     <div>
//                         {paragraphText}
//                     </div>
//                 )}
//             {/* </Box> */}
            
//             <Button 
//                 variant="outlined"
//                 size="small"
//                 onClick={() => removeSeg(segmentID)}
//             >Delete Note</Button>
            
//             {editMode ? (
//                 <Button 
//                     variant="outlined"
//                     size="small"
//                     onClick={handleSaveClick}
//                 >Save Note</Button>
//                 ) : (
//                 <Button 
//                     variant="outlined"
//                     size="small"
//                     onClick={handleEditClick}
//                 >Update Note</Button>
//                 )
//             }
//         </div>
//     );
    return (
        <TableRow key={segment.text}>
        <TableCell component="th" scope="row">
            { !editMode && <Typography>{segment.text}</Typography> }
            { editMode && (
                <div>
                    <Input 
                        value={paragraphText}
                        onChange={(e) => setParagraphText(e.target.value)}
                    /> 
                    <Button onClick={() => {
                        updateSeg(segment.id, paragraphText)
                        setEditMode(false)
                    }}>
                        Submit
                    </Button>
                </div> )}           
        </TableCell>
        <TableCell align="right">{segment.sentiment}</TableCell>
        <TableCell align="right">{segment.timestamp}</TableCell>
        <TableCell align="right">
          <Button onClick={() => setEditMode(!editMode)}>{editMode === true ? "Cancel" : "Edit"}</Button>  
        </TableCell>
        <TableCell align="right">
          <Button onClick={() => removeSeg(segment.id)}>Delete note</Button>
        </TableCell>
      </TableRow>
    );
}
