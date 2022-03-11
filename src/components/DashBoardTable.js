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

const dashBoardColumns = [
    '#',
    'Submission ID',
    'Git Repository URL',
    'Pattern Name',
    'Created Date',
    'Status',
    'Actions'
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
                                            <Typography variant="overline" align="center">
                                                {index + 1}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            {pipeLine['_id']}
                                        </TableCell>
                                        <TableCell>
                                            {pipeLine['gitURL']}
                                        </TableCell>
                                        <TableCell>
                                            {pipeLine['patternName']}
                                        </TableCell>
                                        <TableCell>
                                            {pipeLine['createTs'].toDateString()}
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                sx={{ maxHeight: 40, minWidth: 110, maxWidth: 110 }}
                                                label={
                                                    <Typography variant="overline">
                                                        {((typeof pipeLine['processingIndexed'] !== 'undefined') && (pipeLine['processingIndexed'] === true)) ? 'Finished' : 'Pending'}
                                                    </Typography>
                                                }
                                                color={((typeof pipeLine['processingIndexed'] !== 'undefined') && (pipeLine['processingIndexed'] === true)) ? 'success' : 'error'}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <CustomTooltip title={getToolTipTitle(10)} placement={getToolTipPlacement(10)}>
                                                <EditIcon color="disabled" />
                                            </CustomTooltip>
                                            <CustomTooltip title={getToolTipTitle(11)} placement={getToolTipPlacement(11)}>
                                                <ReplayIcon color="disabled" />
                                            </CustomTooltip>
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