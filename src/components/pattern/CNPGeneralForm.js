import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function CNPGeneralForm(props) {
    let {
        patternName,
        setPatternName,
        subFormName,
        setSubFormName
    } = props;
    return (
        <React.Fragment>
            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                alignContent: 'center',
                m: 1
            }}>
                <Typography variant="overline" color="primary" sx={{ minWidth: 100, pb: 1 }}>
                    Pattern Name
                </Typography>
                <TextField
                    variant="outlined"
                    size="small"
                    sx={{ minWidth: 400, pl: 3, m: 1 }}
                    required
                    autoFocus
                    value={patternName}
                    helperText={patternName === '' ? 'Required' : '  '}
                    onChange={(e) => setPatternName(e.target.value)}
                />
            </Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                alignContent: 'center',
                m: 1,
            }}>
                <Typography variant="overline" color="primary" sx={{ minWidth: 100, pb: 2 }}>
                    Sub Form Names
                </Typography>
                <TextField
                    variant="outlined"
                    size="small"
                    sx={{ minWidth: 400, pl: 1, m: 1 }}
                    required
                    value={subFormName}
                    onChange={(e) => setSubFormName(e.target.value)}
                    helperText={subFormName === '' ? 'Required' : 'Enter Multiple values in CSV format'}
                />
            </Box>
        </React.Fragment>
    );
}