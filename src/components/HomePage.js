import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import NavBar from './NavBar';
import MenuBar from './MenuBar';

const accIACTheme = createTheme({
    palette: {
        primary: {
            main: '#460074',
        },
    },
});

export default function HomePage() {
    return (
        <ThemeProvider theme={accIACTheme}>
            <NavBar />
            <MenuBar />
        </ThemeProvider >
    );
}

