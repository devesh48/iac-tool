import * as React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

export default function CNPDisplayField(props) {
    const { field } = props;
    switch (field.type) {
        case 'textbox':
            return (
                <React.Fragment>
                    <TextField
                        variant="outlined"
                        size="small"
                        sx={{
                            maxWidth: 300
                        }}
                        fullWidth
                        label={field.label}
                    />
                </React.Fragment>
            );
        case 'textarea':
            return (
                <React.Fragment>
                    <TextField
                        variant="outlined"
                        size="small"
                        multiline
                        rows={2}
                        sx={{
                            maxWidth: 300
                        }}
                        fullWidth
                        label={field.label}
                    />
                </React.Fragment>
            );
        case 'select':
            return (
                <React.Fragment>
                    <TextField
                        variant="outlined"
                        size="small"
                        select
                        sx={{
                            maxWidth: 300
                        }}
                        fullWidth
                        label={field.label}>
                        {field.values.length > 0 && field.values.map((option, index) => (
                            <MenuItem key={index}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </React.Fragment>
            );
        default: return (
            <React.Fragment>
            </React.Fragment>
        );
    }
}