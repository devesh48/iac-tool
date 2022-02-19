import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

export default function GeneralForm() {
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Avatar variant="square" alt='A' src="/acc_logo2.svg" onClick={() => window.location.reload(false)} />
                <Typography variant="subtitle1" noWrap component="div" sx={{ m: 2 }}>
                    ACCENTURE IAC TOOL
                </Typography>
            </Toolbar>
        </AppBar>
    );
}