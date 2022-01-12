import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import { fetchJSON } from '../../configs/utils';

export default function DisplayTemplate(props) {
    const { pattern, template } = props;
    const [config, setConfig] = React.useState('');


    React.useEffect(() => {
        let json = fetchJSON(template);
        setConfig(json);
    }, [template]);

    return (
        <Box>
            <Typography variant="overline" sx={{ m: 4 }}>
                Displaying Fields for {config.templateName}
            </Typography>
            <Stack spacing={2}>
                {
                    config === '' ? (
                        <React.Fragment>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {config.templateDetails.map((field) => {
                                return <TextField
                                    label={field.label}
                                    name={field.name}
                                    variant="outlined"
                                    size="small"
                                    sx={{ p: 1, maxWidth: 300 }}
                                />
                            })
                            }
                        </React.Fragment>
                    )
                }
            </Stack>
        </Box>
    );
}