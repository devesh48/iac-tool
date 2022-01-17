
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Divider from '@mui/material/Divider';
import Pagination from '@mui/material/Pagination';

import { newPatternSteps, addPatternOptions, defaultPatterns } from '../../../configs/constants';

export default function NewPattern() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const [page, setPage] = React.useState(1);
    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleTypeChange = (option) => {
        if (option === addPatternOptions[0]) {
            let newSkipped = skipped;
            if (isStepSkipped(activeStep)) {
                newSkipped = new Set(newSkipped.values());
                newSkipped.delete(activeStep);
            }
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setSkipped(newSkipped);
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 2);
            setSkipped((prevSkipped) => {
                const newSkipped = new Set(prevSkipped.values());
                newSkipped.add(activeStep);
                return newSkipped;
            });
        }
    }

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
                {newPatternSteps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === newPatternSteps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    {activeStep === 0 ? (
                        <React.Fragment>
                            <Divider sx={{ mt: 2 }}>
                                <Typography variant="overline" color="primary">
                                    Choose from below
                                </Typography>
                            </Divider>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap', m: 2 }}>
                                {addPatternOptions.map((option) => {
                                    return (
                                        <Box sx={{ m: 2, minWidth: 300 }} key={option}>
                                            <div onClick={() => handleTypeChange(option)}>
                                                <Card variant='outlined' key={option}>
                                                    <CardActionArea>
                                                        <CardContent>
                                                            <Typography variant="overline" align="center" color="primary">
                                                                {option}
                                                            </Typography>
                                                        </CardContent>
                                                    </CardActionArea>
                                                </Card>
                                            </div>
                                        </Box>
                                    );
                                })}
                            </Box>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>

                        </React.Fragment>
                    )}
                    {activeStep === 1 ? (
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
                                            <div>
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
                                <Pagination count={10} page={page} onChange={handlePageChange} sx={{ mt: 20 }} variant="outlined" shape="rounded" />
                            </Box>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>

                        </React.Fragment>
                    )}
                    {activeStep === 1 ? (
                        <React.Fragment>

                        </React.Fragment>
                    ) : (
                        <React.Fragment>

                        </React.Fragment>
                    )}
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            sx={{ maxHeight: 40 }}
                            size="small"
                            variant="contained"
                            color="primary"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                        >
                            Go Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button
                            onClick={handleNext}
                            sx={{ maxHeight: 40 }}
                            size="small"
                            variant="contained"
                            color="primary"
                            disabled={activeStep === 0}>
                            {activeStep === newPatternSteps.length - 1 ? 'Submit Form' : 'Next Step'}
                        </Button>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}
