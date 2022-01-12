import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { patterns, templates } from '../../configs/constants';
import DisplayTemplate from './DisplayTemplate';


export default function ShowPattern(props) {
    const { isNewSubmission } = props;
    console.log('In ShowPattern, isNewSubmission:' + isNewSubmission)
    const [pattern, setPattern] = React.useState('');
    const [template, setTemplate] = React.useState('');

    const handleChangePattern = (event) => {
        setPattern(event.target.value);
    };
    const handleChangeTemplate = (event) => {
        setTemplate(event.target.value);
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
                    helperText={isNewSubmission ? "Select Pattern" : "Choose From Existing Pattern"}
                    select>
                    {patterns.map((p, index) => (
                        <MenuItem key={index} value={p}>
                            {p}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label="Template"
                    variant="outlined"
                    size="small"
                    value={template}
                    onChange={handleChangeTemplate}
                    helperText={isNewSubmission ? "Select Template" : "Choose From Existing Template"}
                    select
                    disabled={pattern === ''}>
                    {templates.map((temp, index) => (
                        <MenuItem key={index} value={temp}>
                            {temp}
                        </MenuItem>
                    ))}
                </TextField>
                {isNewSubmission === true ? (
                    <React.Fragment>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Typography variant="subtitle" sx={{ m: 2, pt: 1 }}>
                            OR
                        </Typography>
                        <Button
                            sx={{ maxHeight: 40 }}
                            variant="outlined"
                            size="small"
                            color="primary"
                        >
                            Add Non Existing pattern
                        </Button>
                    </React.Fragment>
                )}
            </Stack>
            <CssBaseline />
            <Container maxWidth="lg">
                {(pattern !== '' && template !== '') ? (
                    <React.Fragment>
                        <Box sx={{ bgcolor: '#E6E6E6', height: '60vh' }} >
                            {
                                isNewSubmission ? (
                                    <React.Fragment>
                                        <DisplayTemplate pattern={pattern} template={template} />
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                        <DisplayTemplate pattern={pattern} template={template} />
                                    </React.Fragment>
                                )
                            }
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                    </React.Fragment>
                )}

            </Container>
        </Box >
    );
}
