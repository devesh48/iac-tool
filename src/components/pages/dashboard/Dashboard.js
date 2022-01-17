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

import { submissions } from '../../../mocks/submissions';

const columns = [
    'Git Repository URL',
    'Owner',
    'Account Info',
    'Data Classification'
]

function TableComponent() {
    return (
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
                        <TableCell key={'status'} sx={{ borderColor: "#460074" }}>
                            <Typography variant="overline" align="center" color="primary">
                                Status
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {submissions.map((submission, index) => {
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
                                    {submission.projectInfo.gitRepoURL}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="overline" align="center">
                                    {submission.projectInfo.owner1}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="overline" align="center">
                                    {submission.projectInfo.account}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="overline" align="center">
                                    {submission.projectInfo.dataClass}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Button
                                    sx={{ maxHeight: 40 }}
                                    size="small"
                                    variant="contained"
                                    color="success"
                                >
                                    saved
                                </Button>
                            </TableCell>
                        </TableRow>);
                    })}

                </TableBody>
            </Table>
        </TableContainer>
    );
}


export default function Dashboard() {
    return (
        <React.Fragment>
            <Typography variant="subtitle1" align="center" color="primary">
                SUBMISSIONS LIST
            </Typography>
            <TableComponent />
        </React.Fragment>
    );
}
