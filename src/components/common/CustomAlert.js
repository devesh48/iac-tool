import * as React from 'react';
import MuiAlert from '@mui/material/Alert';

export const CustomAlert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});