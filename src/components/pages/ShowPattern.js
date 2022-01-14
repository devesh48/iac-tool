import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import DescriptionIcon from '@mui/icons-material/Description';

import { defaultPatterns, dataBrickTemplates, stages } from '../../configs/constants';
import DisplayTemplate from './DisplayTemplate';

export default function ShowPattern(props) {
    const { isNewSubmission, isNonExistingPattern } = props;
    console.log('In ShowPattern, isNewSubmission:' + isNewSubmission + ',isNonExistingPattern:' + isNonExistingPattern);

    const [pattern, setPattern] = React.useState('');
    const [template, setTemplate] = React.useState('');
    const [activeStep, setActiveStep] = React.useState(0);

    const handleChangePattern = (pat) => {
        setPattern(pat);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const handleChangeTemplate = (temp) => {
        setTemplate(temp);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleFinish = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep} sx={{ mb: 1 }}>
                {stages.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step key={label} {...stepProps}>
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
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap', m: 2 }}>
                                        {dataBrickTemplates.map((temp) => {
                                            return (
                                                <Box sx={{ m: 2, minWidth: 300 }} key={temp}>
                                                    <div onClick={() => handleChangeTemplate(temp)}>
                                                        <Card variant='outlined' key={temp}>
                                                            <CardActionArea>
                                                                <CardContent>
                                                                    <Typography variant="overline" align="center" color="primary">
                                                                        {temp}
                                                                    </Typography>
                                                                </CardContent>
                                                            </CardActionArea>
                                                        </Card>
                                                    </div>
                                                </Box>
                                            );
                                        })}
                                    </Box>
                                </React.Fragment>) : (
                                <React.Fragment>
                                    <DescriptionIcon fontSize="large" color="primary" />
                                    <br />
                                    <Typography variant="subtitle1" sx={{ alignContent: 'center' }}>
                                        NO TEMPLATES AVAIALABLE
                                    </Typography>
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
                    {activeStep === 2 ? (
                        <React.Fragment>
                            <Divider>
                                <Typography variant="overline" color="primary">
                                    Displaying Fields for {template}
                                </Typography>
                            </Divider>
                            <Container>
                                {(pattern !== '' && template !== '') ? (
                                    <React.Fragment>
                                        <Box sx={{ border: 1, height: '65vh', mt: 1 }} >
                                            <DisplayTemplate
                                                pattern={pattern}
                                                template={template}
                                                isNewSubmission={isNewSubmission}
                                                isNonExistingPattern={isNonExistingPattern}
                                                handleBack={handleBack}
                                                handleFinish={handleFinish} />
                                        </Box>
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                    </React.Fragment>
                                )}
                            </Container>
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