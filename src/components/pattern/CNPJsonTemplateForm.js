import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function CNPJsonTemplateForm(props) {
    let { jsonTemplate,
        setJSONTemplate } = props;
    return (
        <React.Fragment>
            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                alignContent: 'center',
                m: 1
            }}>
                <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                    autoFocus
                    multiline
                    rows={10}
                    value={jsonTemplate}
                    onChange={(e) => setJSONTemplate(e.target.value)}
                />
            </Box>
        </React.Fragment>
    );
}