import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { submissions } from '../../mocks/submissions';

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
                            #
                        </TableCell>
                        {columns.map((column, index) => {
                            return (
                                <TableCell key={index} sx={{ borderColor: "#460074" }}>
                                    {column}
                                </TableCell>
                            );
                        })}
                        <TableCell key={'status'} sx={{ borderColor: "#460074" }}>
                            Status
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
                                {index + 1}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {submission.projectInfo.gitRepoURL}
                            </TableCell>
                            <TableCell>
                                {submission.projectInfo.owner1}
                            </TableCell>
                            <TableCell>
                                {submission.projectInfo.account}
                            </TableCell>
                            <TableCell>
                                {submission.projectInfo.dataClass}
                            </TableCell>
                            <TableCell>
                                Saved
                            </TableCell>
                        </TableRow>);
                    })}

                </TableBody>
            </Table>
        </TableContainer>
    );
}


export default function Home() {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom component="div">
                Submission List
            </Typography>
            <TableComponent />
        </React.Fragment>
    );
}
