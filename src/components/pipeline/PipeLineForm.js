import * as React from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import PLFStepperContent from './PLFStepperContent';
import { defaultStepsToAddSubmission } from '../../config/constants';

import { patternNameListMock, patternDetailsMock } from '../../config/mocks';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function PipeLineForm() {
    const [isAlert, setIsAlert] = React.useState(false);
    const [activeStep, setActiveStep] = React.useState(0);
    const [stepsArray, setStepsArray] = React.useState(defaultStepsToAddSubmission);
    const [currentStep, setCurrentStep] = React.useState('');
    const [patternNameSelected, setPatternNameSelected] = React.useState('');
    const [patternDetails, setPatternDetails] = React.useState({});

    const [gitURL, setGitURL] = React.useState('');
    const [gitToken, setGitToken] = React.useState('');

    const [pageLoad, setPageLoad] = React.useState(false);
    const [patternNameList, setPatternNameList] = React.useState([]);
    const [patternDetailsArray, setPatternDetailsArray] = React.useState([]);
    const [currPattern, setCurrPattern] = React.useState({});

    const [formJson, setFormJson] = React.useState({
        "patternName": "",
        "templateDetails": [],
        "jsonTemplate": {
        }
    });

    const handleNext = () => {
        const STATE_KEY = "sohel";
        sessionStorage.setItem(STATE_KEY, 0);

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setCurrentStep(stepsArray[activeStep + 1]);

        if (activeStep === stepsArray.length - 1) {
            setIsAlert(true);
            handleSubmit();
        }
    };

    const getPatternDetail = (name) => {
        console.log(name);
        let index = patternDetailsArray.findIndex((obj) => obj.patternName === name);
        if (index > -1) {
            let patternObj = patternDetailsArray[index];
            setCurrPattern(patternObj);
            setPatternDetails(patternObj);

            let arr = patternObj['templateDetails'];
            let tempArr = [];
            arr.forEach(subForm => {
                tempArr.push(subForm['templateName']);
            });

            let stepsArr = [];
            stepsArr.push(stepsArray[0]);
            stepsArr.push(stepsArray[stepsArray.length - 1]);
            stepsArr.push(...tempArr);
            //console.log(stepsArr);
            setStepsArray(stepsArr);
            handleNext();
        }

    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
        setStepsArray(defaultStepsToAddSubmission);
        setPatternNameSelected('');
        setCurrentStep(defaultStepsToAddSubmission[0]);
    };

    const fetchPatternDetails = () => {
        if (patternNameSelected !== '') {
            axios.get('https://iac-tool.herokuapp.com/getPatternByName/' + patternNameSelected)
                .then(res => {
                    if (res.data.length > 0) {
                        console.log(res.data);
                        setPatternDetails(res.data);
                    }
                    console.log("Fetched all pattern details successfully for pattern:" + patternNameSelected);
                })
                .catch(err => {
                    console.log("Failed to fetch pattern details for pattern: " + patternNameSelected);
                    console.log(err);
                    setPatternDetails(patternDetailsMock);
                });
        } else {
            setPatternDetails(patternDetailsMock);
        }
        handleDisplayForm();
    }
    const handleDisplayForm = () => {
        let tempArr = [];
        let arr = patternDetails['templateDetails'];
        if (typeof arr === 'undefined' || arr.length === 0) {
            arr = patternDetailsMock['templateDetails'];
        }
        arr.forEach(subForm => {
            tempArr.push(subForm['templateName']);
        });

        let stepsArr = [];
        stepsArr.push(stepsArray[0])
        stepsArr.push(...tempArr);
        stepsArr.push(stepsArray[stepsArray.length - 1]);
        setCurrentStep(stepsArr[1]);
        //console.log(stepsArr);
        setStepsArray(stepsArr);
    }

    const handleSubmit = () => {
        currPattern['gitURL'] = gitURL;
        currPattern['gitToken'] = gitToken;
        console.log(currPattern);
        axios.post('https://iac-tool.herokuapp.com/createNewPipeline', currPattern)
            .then(res => {
                console.log("Post request sent successfully to save new pipeline");
                if (res.status === "200" && res.data) {
                    console.log(res.data);
                }
            })
            .catch(err => {
                console.log("Failed to send post request");
                console.log(err);
            })
        handleReset();
    }

    React.useEffect(() => {
        axios.get('https://iac-tool.herokuapp.com/getPatternNames')
            .then(res => {
                if (res.data.length > 0) {
                    setPatternNameList(res.data);
                    getAllPatternDetails(res.data);
                }
                console.log("Fetched all pattern names successfully");
            })
            .catch(err => {
                console.log("Failed to fetch pattern names");
                console.log(err);
                setPatternNameList(patternNameListMock);
            });
        setPageLoad(true);
    }, [pageLoad]);

    const getAllPatternDetails = (data) => {
        let patternDetArr = [];
        data.forEach(pat => {
            let URL = 'https://iac-tool.herokuapp.com/getPatternByName/' + pat;
            axios.get(URL)
                .then(res => {
                    patternDetArr.push(res.data);
                })
                .catch(err => {
                    console.log("Failed to fetch pattern details for pattern: " + pat);
                    console.log(err);
                });
        });
        setPatternDetailsArray(patternDetArr);
    }

    return (
        <React.Fragment>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                height: '100%',
                minHeight: 500
            }}>
                <Box sx={{
                    p: 1,
                    m: 1,
                    width: 250,
                }}>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        {stepsArray.map((step, index) => (
                            <Step key={index}>
                                <StepLabel>
                                    <Typography variant="overline" align="center" color="primary">
                                        {step}
                                    </Typography>
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>
                <Box sx={{
                    m: 1, width: 990, bgcolor: "#FFFFFF", flexWrap: 'wrap',
                    borderRadius: 2,
                }}>
                    <PLFStepperContent
                        activeStep={activeStep}
                        stepsArray={stepsArray}
                        handleNext={handleNext}
                        handleBack={handleBack}
                        handleReset={handleReset}
                        currentStep={currentStep}
                        setCurrentStep={setCurrentStep}
                        patternNameSelected={patternNameSelected}
                        setPatternNameSelected={setPatternNameSelected}
                        patternDetails={patternDetails}
                        handleDisplayForm={handleDisplayForm}
                        gitURL={gitURL}
                        setGitURL={setGitURL}
                        gitToken={gitToken}
                        setGitToken={setGitToken}
                        patternNameList={patternNameList}
                        getPatternDetail={getPatternDetail}
                        currPattern={currPattern} />
                </Box>
            </Box>
            <Snackbar open={isAlert} autoHideDuration={5000} onClose={() => setIsAlert(false)}>
                <Alert variant="outlined" severity="success" sx={{ maxWidth: 400 }}>
                    A new pipeline is submitted
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
}