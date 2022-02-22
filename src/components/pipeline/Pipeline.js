import * as React from 'react';
import Box from '@mui/material/Box';
import PipeLineForm from './PipeLineForm';

function Item(props) {
    const { sx, ...other } = props;
    return (
        <Box
            sx={{
                ...sx,
            }}
            {...other}
        />
    );
}

export default function Pipeline() {

    return (
        <React.Fragment>
            <React.Fragment>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                >
                    <Item
                        sx={{
                            width: 1050,
                            border: '1px solid',
                            borderColor: (theme) => 'grey.300',
                            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
                            borderRadius: 2,
                        }}
                    >
                        <PipeLineForm />
                    </Item>
                    <Item
                        sx={{
                            width: 400,
                            height: '100%',
                        }}
                    >
                    </Item>
                </Box>
            </React.Fragment>
        </React.Fragment>
    );
}