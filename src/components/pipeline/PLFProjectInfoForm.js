import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import HelpIcon from '@mui/icons-material/Help';
import { CustomTooltip } from '../common/CustomTooltip';
import { neonBlue } from '../../config/colors';
import { getToolTipTitle, getToolTipPlacement } from '../../config/utils';

export default function PLFProjectInfoForm(props) {
    let {
        gitURL,
        setGitURL,
        gitToken,
        setGitToken
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
                    GitHub URL
                </Typography>
                <TextField
                    variant="outlined"
                    size="small"
                    sx={{ minWidth: 400, m: 1 }}
                    required
                    autoFocus
                    value={gitURL}
                    helperText={'Required*'}
                    onChange={(e) => setGitURL(e.target.value)}
                />
                <CustomTooltip title={getToolTipTitle(6)} placement={getToolTipPlacement(6)}>
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
                    Github Token
                </Typography>
                <TextField
                    variant="outlined"
                    size="small"
                    sx={{ minWidth: 400, m: 1 }}
                    required
                    value={gitToken}
                    onChange={(e) => setGitToken(e.target.value)}
                    helperText={'Required*'}
                    type="password"
                />
                <CustomTooltip title={getToolTipTitle(7)} placement={getToolTipPlacement(7)}>
                    <HelpIcon
                        sx={{ color: neonBlue, ml: 1, pb: 3 }} />
                </CustomTooltip>
            </Box>
        </React.Fragment>
    );
}