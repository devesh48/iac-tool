import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import DisplayTemplate from './DisplayTemplate'

export default function NonExistingPattern() {
    return (
        <React.Fragment>
            <Divider variant="inset" component="li">
                <Typography variant="overline" color="primary">
                    Adding a new pattern
                </Typography>
            </Divider>
            <Box sx={{ height: '60vh', border: 1, borderColor: "#460074" }} >
                <DisplayTemplate
                    isNewSubmission={false} isNonExistingPattern={true}/>
            </Box>
        </React.Fragment>
    );
}