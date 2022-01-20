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
import DisplaySubmission from '../new-submission/DisplaySubmission';


import axios from 'axios';

const columns = [
    'Git Repository URL',
    'Owner',
    'Account Info',
    'Data Classification'
]
var projectSubmissionData = [];
const STATE_KEY = "submissionId";
const NAVIGATE_KEY = "NAVIGATE_KEY";
const RENDER_KEY = "RENDER_KEY";
var data = {};
function TableComponent({ handleClick }) {
    const [value, setValue] = React.useState(parseInt(sessionStorage.getItem(STATE_KEY)));
    var [configNew, setConfigNew] = React.useState({});
    sessionStorage.setItem(NAVIGATE_KEY, false);
    const redirectToNewSubmission = (submissionId) => {
        sessionStorage.setItem(STATE_KEY, submissionId);
        sessionStorage.setItem(RENDER_KEY, true);
        sessionStorage.setItem(NAVIGATE_KEY, true);
        // https://iac-tool.herokuapp.com/loadAllConfig
        // 'http://localhost:3001/getStoredProjectConfig/' + submissionId
    }
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
                                ID
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {projectSubmissionData.map((submission, index) => {
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
                                    onClick={() => {
                                        redirectToNewSubmission(submission._id);
                                        console.log('----------------------')
                                        console.log(data)
                                        handleClick(1,data);
                                    }}
                                >{submission._id}</Button>
                            </TableCell>
                        </TableRow>);
                    })}

                </TableBody>
            </Table>
        </TableContainer>
    );
}


export default function Dashboard({ handleClick }) {
    const [config, setConfig] = React.useState('');


    React.useEffect(() => {
        axios.get('https://iac-tool.herokuapp.com/loadAllProjectInfo')
            .then(res => {
                if (res.data.length > 0) {
                    projectSubmissionData = [];
                    var projectSubmissionData1 = res.data
                    for (var j = 0; j < res.data.length; j++) {
                        var tmpProjectSubmission = {};
                        //for (var k=0;k<res.data[j].templateDetails.length; k++) 
                        //{
                        if (res.data[j].templateDetails) {

                            for (var k = 0; k < res.data[j].templateDetails.length; k++) {
                                var gitlabUrl = '', lob = '', owner1 = '', owner2 = '', account = '', dataClass = '', info = '';
                                if (res.data[j].templateDetails[k].templateName === "Project Information") {

                                    for (var x = 0; x < res.data[j].templateDetails[k].templateInputDetails.length; x++) {
                                        if (res.data[j].templateDetails[k].templateInputDetails[x].name === "gitRepoURL")
                                            gitlabUrl = res.data[j].templateDetails[k].templateInputDetails[x].value
                                        if (res.data[j].templateDetails[k].templateInputDetails[x].name === "lob") {
                                            lob = res.data[j].templateDetails[k].templateInputDetails[x].value
                                        }
                                        if (res.data[j].templateDetails[k].templateInputDetails[x].name === "owner1")
                                            owner1 = res.data[j].templateDetails[k].templateInputDetails[x].value
                                        if (res.data[j].templateDetails[k].templateInputDetails[x].name === "owner2")
                                            owner2 = res.data[j].templateDetails[k].templateInputDetails[x].value
                                        if (res.data[j].templateDetails[k].templateInputDetails[x].name === "account")
                                            account = res.data[j].templateDetails[k].templateInputDetails[x].value
                                        if (res.data[j].templateDetails[k].templateInputDetails[x].name === "dataClass")
                                            dataClass = res.data[j].templateDetails[k].templateInputDetails[x].value
                                        if (res.data[j].templateDetails[k].templateInputDetails[x].name === "info")
                                            info = res.data[j].templateDetails[k].templateInputDetails[x].value
                                    }

                                    tmpProjectSubmission = {
                                        _id: res.data[j]._id,
                                        "pattern": res.data[j].patternName,
                                        "projectInfo": {
                                            "gitRepoURL": gitlabUrl,
                                            "lob": lob,
                                            "owner1": owner1,
                                            "owner2": owner2,
                                            "account": account,
                                            "dataClass": dataClass,
                                            "info": info
                                        }
                                    }
                                }
                            }
                            projectSubmissionData.push(tmpProjectSubmission)
                        }
                    }
                    setConfig(res);
                }
            })
            .catch(err => {
                console.log("Failed to fetch config details");
                console.log(err);
            });
    }, []);
    return (
        <React.Fragment>
            <Typography variant="subtitle1" align="center" color="primary">
                SUBMISSIONS LIST
            </Typography>
            <TableComponent handleClick={handleClick} />
        </React.Fragment>
    );
}
