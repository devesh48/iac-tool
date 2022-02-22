import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function PLFProjectInfoForm(props) {
    let {
        gitURL,
        setGitURL,
        gitToken,
        setGitToken
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
                <Typography variant="overline" color="primary" sx={{ minWidth: 100, pb: 3 }}>
                    Github URL
                </Typography>
                <TextField
                    variant="outlined"
                    size="small"
                    sx={{ minWidth: 400, m: 1 }}
                    required
                    autoFocus
                    value={gitURL}
                    helperText={'Required*'}
                    onChange={(e) => setGitURL(e.target.value)}
                />
            </Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                alignContent: 'center',
                m: 1,
            }}>
                <Typography variant="overline" color="primary" sx={{ minWidth: 100, pb: 3 }}>
                    Github Token
                </Typography>
                <TextField
                    variant="outlined"
                    size="small"
                    sx={{ minWidth: 400, m: 1 }}
                    required
                    value={gitToken}
                    onChange={(e) => setGitToken(e.target.value)}
                    helperText={'Required*'}
                    type="password"
                />
            </Box>
        </React.Fragment>
    );
}