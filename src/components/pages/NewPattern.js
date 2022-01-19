import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Divider from '@mui/material/Divider';

import ShowPattern from './ShowPattern';
import NonExistingPattern from './NonExistingPattern';
import { addPatternOptions } from '../../configs/constants';

export default function NewPattern() {
    const [type, setType] = React.useState('');

    const handleTypeChange = (option) => {
        setType(option);
    }
    switch (type) {
        case '': return (
            <React.Fragment>
                <Divider>
                    <Typography variant="overline" color="primary">
                        Choose from below
                    </Typography>
                </Divider>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap', m: 2 }}>
                    {addPatternOptions.map((option) => {
                        return (
                            <Box sx={{ m: 2, minWidth: 300 }} key={option}>
                                <div onClick={() => handleTypeChange(option)}>
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
        );
        case 'Load from existing pattern': return (
            <React.Fragment>
                <ShowPattern isNewSubmission={false} isNonExistingPattern={false} />
            </React.Fragment>
        );
        case 'Create a non existing pattern': return (
            <React.Fragment>
                <NonExistingPattern isNonExistingPattern={true} />
            </React.Fragment>
        );
        default: return (
            <React.Fragment>
            </React.Fragment>
        );
    }
}
