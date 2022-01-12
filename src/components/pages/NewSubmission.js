import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { patterns } from '../../configs/constants';
import DisplayTemplate from './DisplayTemplate';


export default function NewSubmission() {
    const [pattern, setPattern] = React.useState('');
    const handleChangePattern = (event) => {
        setPattern(event.target.value);
    };
    return (
        <Box sx={{ m: 1 }}>
            <Stack direction="row" spacing={4} >
                <TextField
                    label="Pattern"
                    variant="outlined"
                    size="small"
                    value={pattern}
                    onChange={handleChangePattern}
                    helperText="Choose From Existing Pattern"
                    select>
                    {patterns.map((p, index) => (
                        <MenuItem key={index} value={p}>
                            {p}
                        </MenuItem>
                    ))}
                </TextField>
            </Stack>
            <CssBaseline />
            <Container maxWidth="lg">
                {(pattern !== '') ? (
                    <React.Fragment>
                        <Box sx={{ bgcolor: '#E6E6E6', height: '60vh' }} >
                            <DisplayTemplate pattern={pattern} />
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                    </React.Fragment>)}

            </Container>
        </Box >
    );
}
