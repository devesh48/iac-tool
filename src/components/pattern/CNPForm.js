import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';

import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';


import { defaultStepsToAddPattern } from '../../config/constants';

const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 12,
    },
}));

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CNPForm(props) {
    let {
        patternName,
        handlePatternNameChange,
        subFormName,
        handleSubFormNameChange,
        fieldsArray,
        handleRemoveField
    } = props;
    const [activeStep, setActiveStep] = React.useState(0);
    const [stepsArray, setStepsArray] = React.useState(defaultStepsToAddPattern);

    const [open, setOpen] = React.useState(false);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);

        if (activeStep === 0)
            if (subFormName.length > 0)
                handleMultiSubForm();

        if (activeStep === stepsArray.length - 1)
            setOpen(true);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
        setStepsArray(defaultStepsToAddPattern);
    };

    React.useEffect(() => {
    }, []);

    const [subFormArray, setSubFormArray] = React.useState([]);

    const handleMultiSubForm = () => {
        let arr = subFormName.split(',');
        setSubFormArray(arr);
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
            <Box sx={{ p: 1 }}>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {stepsArray.map((step, index) => (
                        <Step key={index}>
                            <StepLabel>
                                <Typography variant="overline" align="center" color="primary">
                                    {step}
                                </Typography>
                            </StepLabel>
                            <StepContent>
                                {index === 0 ? (
                                    <React.Fragment>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-evenly',
                                                alignItems: 'center',
                                                alignContent: 'center'
                                            }}
                                        >
                                            <Typography variant="overline" color="primary" sx={{ minWidth: 100, m: 1 }}>
                                                Pattern Name
                                            </Typography>
                                            <TextField
                                                variant="outlined"
                                                size="small"
                                                sx={{ maxWidth: 300, pl: 3 }}
                                                required
                                                autoFocus
                                                value={patternName}
                                                onChange={handlePatternNameChange}
                                            />
                                            <Typography variant="overline" color="primary" sx={{ minWidth: 100, ml: 10 }}>
                                                Sub Form Names
                                            </Typography>
                                            <TextField
                                                variant="outlined"
                                                size="small"
                                                sx={{ maxWidth: 300, pl: 3 }}
                                                value={subFormName}
                                                onChange={handleSubFormNameChange}
                                            />
                                        </Box>
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                    </React.Fragment>
                                )}
                                {(index === stepsArray.length - 1) ? (
                                    <React.Fragment>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-evenly',
                                                alignItems: 'center',
                                                alignContent: 'center'
                                            }}
                                        >
                                            <TextField
                                                variant="outlined"
                                                size="small"
                                                fullWidth
                                                required
                                                autoFocus
                                                multiline
                                                rows={10}
                                            />
                                        </Box>
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                    </React.Fragment>
                                )}
                                {console.log('index:' + index)}
                                {index !== 0 && index !== stepsArray.length - 1 ? (
                                    <React.Fragment>
                                        <DisplayFieldsArray fieldsArray={fieldsArray} handleRemoveField={handleRemoveField} />
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                    </React.Fragment>
                                )}

                                <Box sx={{
                                    mb: 2,
                                    display: 'flex',
                                    alignItems: 'baseline',
                                    justifyContent: 'flex-end'
                                }}>
                                    <Button
                                        onClick={handleNext}
                                        sx={{ maxHeight: 40, mt: 2, mr: 1 }}
                                        size="small"
                                        variant="contained"
                                        color="primary"
                                        disabled={patternName === '' && subFormName === ''}
                                    >
                                        {index === stepsArray.length - 1 ? 'Submit' : 'Next'}
                                    </Button>
                                    <Button
                                        disabled={index === 0}
                                        onClick={handleBack}
                                        sx={{ maxHeight: 40, mt: 2, mr: 1 }}
                                        size="small"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Back
                                    </Button>
                                </Box>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === stepsArray.length && (
                    <Button
                        onClick={handleReset}
                        sx={{ maxHeight: 40, mt: 1, mr: 1 }}
                        size="small"
                        variant="contained"
                        color="primary">
                        Create Another ?
                    </Button>
                )}
            </Box>
            <Snackbar open={open} autoHideDuration={5000} onClose={() => setOpen(false)}>
                <Alert variant="outlined" severity="success" sx={{ maxWidth: 200 }}>
                    A new pattern is saved
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
}

function DisplayFieldsArray(props) {
    let { fieldsArray, handleRemoveField } = props;
    return (
        <React.Fragment>
            <Grid container spacing={2}>
                {fieldsArray.map((field) => {
                    return (
                        <Grid item xs={6} key={field.label}>
                            <DisplayField field={field} />
                            <LightTooltip title="Delete" placement="right">
                                <ClearOutlinedIcon
                                    fontSize="large"
                                    sx={{ color: '#CC0000', ml: 1 }}
                                    onClick={() => handleRemoveField(field)}
                                />
                            </LightTooltip>
                        </Grid>)
                })}
            </Grid>
        </React.Fragment>);
}

function DisplayField(props) {
    const { field } = props;
    console.log(field)
    switch (field.type) {
        case 'textbox':
            return (
                <React.Fragment>
                    <TextField
                        variant="outlined"
                        size="small"
                        sx={{ maxWidth: 300 }}
                        label={field.label}
                    />
                </React.Fragment>
            );
        case 'textarea':
            return (
                <React.Fragment>
                    <TextField
                        variant="outlined"
                        size="small"
                        multiline
                        rows={2}
                        sx={{ maxWidth: 300 }}
                        label={field.label}
                    />
                </React.Fragment>
            );
        case 'select':
            return (
                <React.Fragment>
                    <TextField
                        variant="outlined"
                        size="small"
                        select
                        sx={{ maxWidth: 300 }}
                        label={field.label}
                        fullWidth>
                        {field.values.length > 0 && field.values.map((option, index) => (
                            <MenuItem key={index}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </React.Fragment>
            );
        default: return (
            <React.Fragment>
            </React.Fragment>
        );
    }
}