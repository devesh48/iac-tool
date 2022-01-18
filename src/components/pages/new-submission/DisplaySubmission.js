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
import Alert from '@mui/material/Alert';

import { stages } from '../../../configs/constants';
import { getTemplatesForPattern, getInitialValue, getDefaultPatterns } from '../../../configs/utils';
import DisplayTemplate from './DisplayTemplate';
import axios from 'axios';

export default function DisplaySubmission() {

    const [pattern, setPattern] = React.useState('');
    const [defaultPatterns, setDefaultPatterns] = React.useState([]);
    const [initialFormValue, setInitialFormValue] = React.useState({});
    const [activeStep, setActiveStep] = React.useState(0);
    const [page, setPage] = React.useState(1);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [formDetails, setFormDetails] = React.useState({});
    const [fieldChanges, setFieldChanges] = React.useState('');
    const [newSubmissionSaved, setNewSubmissionSaved] = React.useState(false);
    const [newPatternSaved, setNewPatternSaved] = React.useState(false);

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleChangePattern = (pat) => {
        let temp = getTemplatesForPattern(pat);
        let initValue = getInitialValue(pat, temp);
        setFormDetails(initValue);
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
            let text = '';
            if (fieldsAddedCount > 0) {
                text += fieldsAddedCount;
                text += ' New field(s) were added \n';
            }
            if (fieldsRemovedCount > 0) {
                text += fieldsAddedCount;
                text += ' New field(s) were removed \n'
            }
            setInitialFormValue(values);
            setFieldChanges(text);
            setDialogOpen(true);
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);

        axios.post('https://iac-tool.herokuapp.com/triggerDeployment', values)
            .then(res => {
                console.log("Post request sent successfully for new submission");
                console.log(res);
                setNewSubmissionSaved(true);
            })
            .catch(err => {
                console.log("Failed to send post request");
                console.log(err);
                setNewSubmissionSaved(false);
            })
    }

    const handleSubmitPattern = () => {
        axios.post('https://iac-tool.herokuapp.com/updateConfig', initialFormValue)
            .then(res => {
                console.log("Post request sent successfully for saving new pattern");
                console.log(res);
                setNewPatternSaved(true);
            })
            .catch(err => {
                console.log("Failed to send post request");
                console.log(err);
                setNewPatternSaved(false);
            });
        setDialogOpen(false);
    }

    React.useEffect(() => {
        let patterns = getDefaultPatterns();
        setDefaultPatterns(patterns);
    }, [pattern])

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
                                    <DisplayTemplate initialFormValue={initialFormValue} handleBack={handleBack} handleSubmit={handleSubmit} />
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
                            You have made the below changes :
                        </Typography>
                        <Typography variant="overline" sx={{ m: 1 }}>
                            {fieldChanges}
                        </Typography>
                        <br />
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