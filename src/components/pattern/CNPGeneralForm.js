import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import HelpIcon from '@mui/icons-material/Help';
import { CustomTooltip } from '../common/CustomTooltip';
import { neonBlue } from '../../config/colors';
import { getToolTipTitle, getToolTipPlacement } from '../../config/utils';

export default function CNPGeneralForm(props) {
    let {
        patternName,
        setPatternName,
        subFormName,
        setSubFormName
    } = props;
    return (
        <React.Fragment>
            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                alignContent: 'center',
                m: 1
            }}>
                <Typography variant="overline" color="primary" sx={{ minWidth: 100, pb: 3 }}>
                    Pattern Name
                </Typography>
                <TextField
                    variant="outlined"
                    size="small"
                    sx={{ minWidth: 400, pl: 3, m: 1 }}
                    required
                    autoFocus
                    value={patternName}
                    helperText="Required*"
                    onChange={(e) => setPatternName(e.target.value)}
                />
                <CustomTooltip title={getToolTipTitle(0)} placement={getToolTipPlacement(0)}>
                    <HelpIcon
                        sx={{ color: neonBlue, ml: 1, pb: 3 }} />
                </CustomTooltip>
            </Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                alignContent: 'center',
                m: 1,
            }}>
                <Typography variant="overline" color="primary" sx={{ minWidth: 100, pb: 3 }}>
                    Sub Form Names
                </Typography>
                <TextField
                    variant="outlined"
                    size="small"
                    sx={{ minWidth: 400, pl: 1, m: 1 }}
                    required
                    value={subFormName}
                    onChange={(e) => setSubFormName(e.target.value)}
                    helperText={subFormName === '' ? 'Required*' : 'Enter Multiple values in CSV format'}
                />
                <CustomTooltip title={getToolTipTitle(1)} placement={getToolTipPlacement(1)}>
                    <HelpIcon
                        sx={{ color: neonBlue, ml: 1, pb: 3 }} />
                </CustomTooltip>
            </Box>
        </React.Fragment>
    );
}