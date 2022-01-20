import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Pagination from '@mui/material/Pagination';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { stages } from '../../../configs/constants';
import { getTemplatesForPattern, getInitialFormValue, getDefaultPatterns } from '../../../configs/utils';
import DisplayTemplate from './DisplayTemplate';
import axios from 'axios';

import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const STATE_KEY = "submissionId";
const NAVIGATE_KEY = "NAVIGATE_KEY";
const RENDER_KEY = "RENDER_KEY";

export default function DisplaySubmission(props) {

    const { config } = props;
    const [pattern, setPattern] = React.useState('');
    const [defaultPatterns, setDefaultPatterns] = React.useState([]);
    const [initialFormValue, setInitialFormValue] = React.useState({});
    const [activeStep, setActiveStep] = React.useState(0);
    const [page, setPage] = React.useState(0);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [fieldChanges, setFieldChanges] = React.useState('');
    const [newSubmissionSaved, setNewSubmissionSaved] = React.useState(false);
    const [newPatternSaved, setNewPatternSaved] = React.useState(false);

    const handleDialogClose = () => {
        setDialogOpen(false);
    };
    const options = {
        position: 'bottom center',
        timeout: 5000,
        offset: '30px',
        transition: 'scale'
    }

    const handleChangePattern = (pat) => {
        let temp = getTemplatesForPattern(config, pat);
        let initValue = getInitialFormValue(pat, temp);
        setInitialFormValue(initValue);
        setPattern(pat);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleSubmit = (values, fieldsAddedCount, fieldsRemovedCount) => {
        //event.preventDefault();
        console.log(values);
        if (fieldsAddedCount > 0 || fieldsRemovedCount > 0) {
            let count = 0;
            if (fieldsAddedCount > 0) {
                count = count + fieldsAddedCount;
            }
            if (fieldsRemovedCount > 0) {
                count = count + fieldsAddedCount;
            }
            let text = count;
            text += ' field(s) were modified';
            setInitialFormValue(values);
            setFieldChanges(text);
            setDialogOpen(true);
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        axios.post('https://iac-tool.herokuapp.com/storeProjectInfo', values)
            .then(res => {
                console.log("Post request sent successfully for new submission");
                if (res.status === "200" && res.data) {
                    console.log(res.data);
                    setNewSubmissionSaved(true);
                }
            })
            .catch(err => {
                console.log("Failed to send post request");
                console.log(err);
            })
    }

    const handleSubmitPattern = () => {
        axios.post('https://iac-tool.herokuapp.com/updateConfig', initialFormValue)
            .then(res => {
                console.log("Post request sent successfully for saving new pattern");
                if (res.data.length > 0) {
                    console.log(res.data);
                    setNewPatternSaved(true);
                }
            })
            .catch(err => {
                console.log("Failed to send post request");
                console.log(err);
            });
        setDialogOpen(false);
    }

    const [editSubmission, setEditSubmission] = React.useState(false);
    React.useEffect(() => {
        let patterns = getDefaultPatterns(config);
        setDefaultPatterns(patterns);

    }, [config]);

    React.useEffect(() => {

        if (sessionStorage.getItem(NAVIGATE_KEY)) {
            setEditSubmission(sessionStorage.getItem(NAVIGATE_KEY));
            sessionStorage.setItem(NAVIGATE_KEY, false);

        }
    }, []);
    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep} sx={{ mb: 1 }}>
                {stages.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step key={label} {...stepProps} >
                            <StepLabel {...labelProps}>
                                <Typography variant="overline" align="center" color="primary">
                                    {label}
                                </Typography>
                            </StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <div>
            </div>
            {editSubmission ? (
                <React.Fragment>
                    <center>
                        <br />
                    </center>
                </React.Fragment>
            ) : (
                <React.Fragment>
                </React.Fragment>
            )}
            {activeStep === stages.length ? (
                <React.Fragment>
                    <center>
                        <br />
                        {newSubmissionSaved ? (
                            <React.Fragment>
                                <Typography variant="overline" color="primary">
                                    New Submission is saved
                                </Typography>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                            </React.Fragment>
                        )}
                        <br />
                        {newPatternSaved ? (
                            <React.Fragment>
                                <br />
                                <Typography variant="overline" color="primary">
                                    New Pattern is saved
                                </Typography>
                                <br />
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                            </React.Fragment>
                        )}
                        <br />
                        <Button
                            onClick={handleReset}
                            sx={{ maxHeight: 40, m: 1 }}
                            size="small"
                            variant="contained"
                            color="primary">
                            Create another submission ?
                        </Button>
                    </center>

                </React.Fragment>
            ) : (
                <React.Fragment>
                    {activeStep === 0 ? (
                        <React.Fragment>
                            <Divider>
                                <Typography variant="overline" color="primary">
                                    Available Patterns
                                </Typography>
                            </Divider>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap', m: 2 }}>
                                {defaultPatterns.map((pat) => {
                                    return (
                                        <Box sx={{ m: 2, minWidth: 300 }} key={pat}>
                                            <div onClick={() => handleChangePattern(pat)}>
                                                <Card variant='outlined' key={pat}>
                                                    <CardActionArea>
                                                        <CardContent>
                                                            <Typography variant="overline" align="center" color="primary">
                                                                {pat}
                                                            </Typography>
                                                        </CardContent>
                                                    </CardActionArea>
                                                </Card>
                                            </div>
                                        </Box>
                                    );
                                })}
                                <Pagination count={10} page={page} onChange={handlePageChange} sx={{ mt: 40 }} variant="outlined" shape="rounded" />
                            </Box>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                        </React.Fragment>
                    )}
                    {activeStep === 1 ? (
                        <React.Fragment>
                            {(pattern === 'Databricks') ? (
                                <React.Fragment>
                                    <Divider>
                                        <Typography variant="overline" color="primary">
                                            Available Templates for {pattern}
                                        </Typography>
                                    </Divider>
                                    <AlertProvider template={AlertTemplate} {...options}>
                                        <DisplayTemplate initialFormValue={initialFormValue} handleBack={handleBack} handleSubmit={handleSubmit} />
                                    </AlertProvider>
                                </React.Fragment>) : (
                                <React.Fragment>
                                    <br />
                                    <img alt='Coming Soon' src="/coming_soon.png" />
                                    <br />
                                    <Button
                                        sx={{ maxHeight: 40 }}
                                        size="small"
                                        variant="contained"
                                        color="primary"
                                        onClick={handleBack}
                                    >
                                        Go Back
                                    </Button>
                                </React.Fragment>
                            )}
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                        </React.Fragment>
                    )}
                </React.Fragment>
            )}

            <Dialog
                open={dialogOpen}
                keepMounted
                onClose={handleDialogClose}
                maxWidth='sm'
                fullWidth
            >
                <DialogTitle>
                    <Typography variant="h6" color="primary">
                        SAVE PATTERN
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Typography variant="subtitle1" sx={{ m: 1 }}>
                            {fieldChanges}
                        </Typography>
                        <br />
                        <Typography variant="subtitle1" sx={{ m: 1 }}>
                            Do you want to save it as a new pattern ?
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        sx={{ maxHeight: 40, m: 1 }}
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={handleDialogClose}
                    >
                        No
                    </Button>
                    <Button
                        sx={{ maxHeight: 40, m: 1 }}
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={handleSubmitPattern}
                    >
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}