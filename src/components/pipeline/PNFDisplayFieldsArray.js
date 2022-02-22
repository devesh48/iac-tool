import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PLFDisplayField from './PLFDisplayField';
import Typography from '@mui/material/Typography';

export default function PNFDisplayFieldsArray(props) {
    let { currPattern, currStep } = props;
    return (
        <React.Fragment>
            <Box>
                {currPattern.templateDetails.map((subForm) => {
                    return (
                        <Box key={subForm.templateName} sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            alignContent: 'center',
                            m: 1,
                        }}>
                            {subForm.templateName === currStep ? (
                                <React.Fragment>
                                    {subForm.templateInputDetails.map((field) => {
                                        return (
                                            <React.Fragment>
                                                <Box sx={{
                                                    display: 'flex',
                                                    justifyContent: 'flex-start',
                                                    alignItems: 'flex-start',
                                                    alignContent: 'flex-start',
                                                    m: 1
                                                }}>
                                                    <Typography variant="overline" color="primary" sx={{ minWidth: 100, pb: 3 }}>
                                                        {field.name}
                                                    </Typography>
                                                    <PLFDisplayField field={field} />

                                                </Box>

                                            </React.Fragment>

                                        )
                                    })}
                                </React.Fragment>) : (
                                <React.Fragment>

                                </React.Fragment>)}
                        </Box>)
                })}
            </Box>
        </React.Fragment >);
}