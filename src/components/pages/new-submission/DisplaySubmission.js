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

import { defaultPatterns, stages } from '../../../configs/constants';
import { getTemplatesForPattern, getInitialValue } from '../../../configs/utils';
import DisplayTemplate from './DisplayTemplate';
import axios from 'axios';

export default function DisplaySubmission(props) {
    const { isNewSubmission } = props;
    //console.log('In DisplaySubmission, isNewSubmission:' + isNewSubmission + ',isNonExistingPattern:' + isNonExistingPattern);

    const [pattern, setPattern] = React.useState('');
    const [activeStep, setActiveStep] = React.useState(0);
    const [page, setPage] = React.useState(1);

    const [formDetails, setFormDetails] = React.useState({});

    const handleChangePattern = (pat) => {
        let temp = getTemplatesForPattern(pat);
        let initValue = getInitialValue(pat, temp);
        setFormDetails(initValue);
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

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formDetails);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);

        axios.post('http://localhost:8080/submissions', formDetails)
            .then(res => {
                console.log("Post request sent successfully");
                console.log(res);                
            })
            .catch(err => {
                console.log("Failed to send post request");
                console.log(err);               
            })
    }

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
                    <br />
                    <Typography variant="overline" color="primary">
                        {isNewSubmission ? 'New Submission is saved' : 'New Pattern is saved'}
                    </Typography>
                    <br />
                    <br />
                    <Button
                        onClick={handleReset}
                        sx={{ maxHeight: 40 }}
                        size="small"
                        variant="contained"
                        color="primary">
                        {isNewSubmission ? 'Create another submission ?' : 'Create Another Pattern ?'}
                    </Button>
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
                                    <form onSubmit={handleSubmit}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap', m: 2 }}>
                                            <DisplayTemplate formDetails={formDetails} />
                                        </Box>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                            <Button
                                                onClick={handleBack}
                                                sx={{ maxHeight: 40 }}
                                                size="small"
                                                variant="contained"
                                                color="primary"
                                            >
                                                Go Back
                                            </Button>
                                            <Box sx={{ flex: '1 1 auto' }} />
                                            <Button
                                                sx={{ maxHeight: 40 }}
                                                size="small"
                                                variant="contained"
                                                color="primary"
                                                type="submit">
                                                Submit Form
                                            </Button>
                                        </Box>
                                    </form>
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


        </Box>
    );
}