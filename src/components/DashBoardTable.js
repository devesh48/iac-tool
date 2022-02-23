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

const columns = [
    'Git Repository URL',
    'Pattern Name',
    'Submission ID'
]

const expectedColumns = [
    'Pattern ID',
    'Pattern Name',
    'Git Repository URL',
    'Submission ID'
]

export default function DashBoardTable(props) {
    let { pipeLineDetails } = props;
    return (
        <React.Fragment>
            {pipeLineDetails.length > 0 ? (<React.Fragment>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell key={'num'} sx={{ borderColor: "#460074" }}>
                                    <Typography variant="overline" align="center" color="primary">
                                        #
                                    </Typography>
                                </TableCell>
                                {columns.map((column, index) => {
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

                                    <TableCell component="th" scope="row">
                                        <Typography variant="overline" align="center">
                                            {pipeLine['gitURL']}
                                        </Typography>
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <Typography variant="overline" align="center">
                                            {pipeLine['patternName']}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        {pipeLine['_id']}
                                    </TableCell>
                                </TableRow>);
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </React.Fragment>) : (<React.Fragment></React.Fragment>)
            }

        </React.Fragment >
    );
}