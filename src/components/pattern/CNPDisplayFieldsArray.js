import * as React from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

import CNPDisplayField from './CNPDisplayField';

const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 12,
    },
}));

export default function CNPDisplayFieldsArray(props) {
    let { fieldsArray, handleRemoveField } = props;
    return (
        <React.Fragment>
            <Grid container spacing={2} sx={{ m: 1 }}>
                {fieldsArray.map((field) => {
                    return (
                        <Grid item xs={6} key={field.label}>
                            <CNPDisplayField field={field} />
                            <LightTooltip title="Delete" placement="right">
                                <ClearOutlinedIcon
                                    fontSize="large"
                                    sx={{ color: '#CC0000', ml: 1 }}
                                    onClick={() => handleRemoveField(field)}
                                />
                            </LightTooltip>
                        </Grid>)
                })}
            </Grid>
        </React.Fragment>);
}