import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import { managePatternOptions } from '../../config/constants';

import CreateNewPattern from './CreateNewPattern';

export default function NewPattern() {

    const [type, setType] = React.useState('');
    return (
        <React.Fragment>
            {(typeof type === 'undefined' || type === '') ? (
                <React.Fragment>
                    <Divider>
                        <Typography variant="overline" color="primary">
                            Choose from below
                        </Typography>
                    </Divider>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap', m: 2 }}>
                        {managePatternOptions.map((option) => {
                            return (
                                <Box sx={{ m: 2, minWidth: 300 }} key={option}>
                                    <div onClick={() => setType(option)}>
                                        <Card variant='outlined' key={option}>
                                            <CardActionArea>
                                                <CardContent>
                                                    <Typography variant="overline" align="center" color="primary">
                                                        {option}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </div>
                                </Box>
                            );
                        })}
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                </React.Fragment>
            )}
            {(type === 'Edit Pattern' || type === 'Load & create a new pattern') ? (
                <React.Fragment>
                    <Divider>
                        <Typography variant="overline" color="primary">
                            {type}
                        </Typography>
                    </Divider>
                    <br />
                    <img alt='Coming Soon' src="/coming_soon.png" />
                    <br />
                    <Button
                        sx={{ maxHeight: 40 }}
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={() => setType('')}
                    >
                        Go Back
                    </Button>
                </React.Fragment>
            ) : (
                <React.Fragment>
                </React.Fragment>
            )}
            {type === 'Create a nonexistent pattern' ? (
                <React.Fragment>
                    <Divider>
                        <Typography variant="overline" color="primary">
                            {type}
                        </Typography>
                    </Divider>
                    <CreateNewPattern />
                </React.Fragment>
            ) : (
                <React.Fragment>
                </React.Fragment>
            )}
        </React.Fragment >
    );
}
