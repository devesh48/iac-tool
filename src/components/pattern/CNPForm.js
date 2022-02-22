import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import { defaultStepsToAddPattern } from '../../config/constants';
import CNPStepperContent from './CNPStepperContent';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CNPForm(props) {
    let {
        patternName,
        setPatternName,
        subFormName,
        setSubFormName,
        fieldsArray,
        setFieldsArray,
        handleRemoveField,
        currentStep,
        setCurrentStep,
        jsonTemplate,
        setJSONTemplate,
        handleSubmit,
        formJson,
        setType
    } = props;
    const [activeStep, setActiveStep] = React.useState(0);
    const [stepsArray, setStepsArray] = React.useState(defaultStepsToAddPattern);

    const [isAlert, setIsAlert] = React.useState(false);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setFieldsArray([]);
        if (activeStep === 0) {
            if (subFormName.length > 0) {
                let arr = subFormName.split(',');
                setCurrentStep(arr[0]);
                handleMultiSubForm(arr);
            }
        } else {
            setCurrentStep(stepsArray[activeStep + 1]);
        }

        if (activeStep === stepsArray.length - 1) {
            setIsAlert(true);
            handleSubmit();
        }

    };

    const handleBack = () => {
        if (activeStep === 0)
            setType('');

        let templateName = stepsArray[activeStep - 1];
        //handle getting previous fields Array
        let tempFormJSON = formJson;
        let templateArr = tempFormJSON['templateDetails'];
        let index = templateArr.findIndex((obj) => obj.templateName === templateName);
        if (index > -1) {
            let templateObj = templateArr[index];
            let fieldArr = templateObj['templateInputDetails'];
            setFieldsArray(fieldArr);
        }

        setCurrentStep(templateName);
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
        setStepsArray(defaultStepsToAddPattern);
        setPatternName('');
        setSubFormName('');
        setCurrentStep(defaultStepsToAddPattern[0]);
    };

    React.useEffect(() => {
        setCurrentStep(defaultStepsToAddPattern[0]);
    }, []);

    const handleMultiSubForm = (arr) => {
        let stepsArr = [];
        stepsArr.push(defaultStepsToAddPattern[0])
        stepsArr.push(...arr);
        for (let i = 2; i < defaultStepsToAddPattern.length; i++) {
            stepsArr.push(defaultStepsToAddPattern[i]);
        }
        //console.log(stepsArr);
        setStepsArray(stepsArr);
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
                    <CNPStepperContent
                        activeStep={activeStep}
                        patternName={patternName}
                        setPatternName={setPatternName}
                        subFormName={subFormName}
                        setSubFormName={setSubFormName}
                        stepsArray={stepsArray}
                        currentStep={currentStep}
                        fieldsArray={fieldsArray}
                        handleNext={handleNext}
                        handleBack={handleBack}
                        handleReset={handleReset}
                        handleRemoveField={handleRemoveField}
                        jsonTemplate={jsonTemplate}
                        setJSONTemplate={setJSONTemplate}
                    />
                </Box>
            </Box>
            <Snackbar open={isAlert} autoHideDuration={7000} onClose={() => setIsAlert(false)}>
                <Alert variant="outlined" severity="success" sx={{ maxWidth: 400 }}>
                    A new pattern is saved
                </Alert>
            </Snackbar>
        </React.Fragment >
    );
}





