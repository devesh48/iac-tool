import * as React from 'react';
import Grid from '@mui/material/Grid';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

import CNPDisplayField from './CNPDisplayField';
import { CustomTooltip } from '../common/CustomTooltip';
import { getToolTipTitle, getToolTipPlacement } from '../../config/utils';

export default function CNPDisplayFieldsArray(props) {
    let { fieldsArray, handleRemoveField } = props;
    return (
        <React.Fragment>
            <Grid container spacing={2} sx={{ maxWidth: 800 }}>
                {fieldsArray.map((field) => {
                    return (
                        <Grid item xs={6} key={field.label}>
                            <CNPDisplayField field={field} />
                            <CustomTooltip title={getToolTipTitle(4)} placement={getToolTipPlacement(4)}>
                                <ClearOutlinedIcon
                                    fontSize="large"
                                    sx={{ color: '#CC0000', ml: 1 }}
                                    onClick={() => handleRemoveField(field)}
                                />
                            </CustomTooltip>
                        </Grid>)
                })}
            </Grid>
        </React.Fragment>);
}