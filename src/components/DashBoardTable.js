import * as React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import ReplayIcon from '@mui/icons-material/Replay';
import Chip from '@mui/material/Chip';
import { CustomTooltip } from './common/CustomTooltip';
import { getToolTipTitle, getToolTipPlacement } from '../config/utils';
import { darkGreen, lightRed } from '../config/colors';

const dashBoardColumns = [
    '#',
    'Submission ID',
    'Git Repository URL',
    'Pattern Name',
    'Created Date',
    'Status'
]

export default function DashBoardTable(props) {
    let { pipeLineDetails } = props;
    return (
        <React.Fragment>
            {pipeLineDetails.length > 0 ? (
                <React.Fragment>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} size="small">
                            <TableHead>
                                <TableRow>
                                    {dashBoardColumns.map((column, index) => {
                                        return (
                                            <TableCell key={index} sx={{ borderColor: "#460074" }}>
                                                <Typography variant="overline" align="center" color="primary">
                                                    {column}
                                                </Typography>
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {pipeLineDetails.map((pipeLine, index) => {
                                    return (<TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell>
                                            <Typography variant="subtitle2" align="center">
                                                {index + 1}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2">
                                                {pipeLine['_id']}
                                            </Typography>

                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2">
                                                {pipeLine['gitURL']}
                                            </Typography>

                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2">
                                                {pipeLine['patternName']}
                                            </Typography>

                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2">
                                                {pipeLine['createTs'].toDateString()}
                                            </Typography>

                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2" color={((typeof pipeLine['processingIndexed'] !== 'undefined') && (pipeLine['processingIndexed'] === true)) ? darkGreen : lightRed}>
                                                {((typeof pipeLine['processingIndexed'] !== 'undefined') && (pipeLine['processingIndexed'] === true)) ? 'FINISHED' : 'PENDING'}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>);
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </React.Fragment>
            ) : (
                <React.Fragment></React.Fragment>
            )
            }
        </React.Fragment >
    );
}