
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
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Switch from '@mui/material/Switch';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';

import { newPatternSteps, addPatternOptions, addFieldTypes } from '../../../configs/constants';
import { getDefaultPatterns, getTemplatesForPattern, getInitialFormValueWithPreLoading, getInputType, getInitialFormValueWithoutPreLoading } from '../../../configs/utils';
import NewPatternForm from './NewPatternForm';
var _ = require('lodash');

export default function NewPattern(props) {
    const { config } = props;

    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [defaultPatterns, setDefaultPatterns] = React.useState([]);
    const [pattern, setPattern] = React.useState('');
    const [initialFormValue, setInitialFormValue] = React.useState({});
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const [fieldType, setFieldType] = React.useState('Text Box');
    const [fieldName, setFieldName] = React.useState('');
    const [fieldNumber, setFieldNumber] = React.useState('');
    const [required, setRequired] = React.useState(true);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleDialogClickOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };
    const handleRequiredChange = (event) => {
        setRequired(event.target.checked);
    };
    const handleFieldTypeChange = (event) => {
        setFieldType(event.target.value);
    };
    const handleFieldNameChange = (event) => {
        setFieldName(event.target.value);
    };
    const handleFieldNumberChange = (event) => {
        setFieldNumber(event.target.value);
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

    React.useEffect(() => {
        let patterns = getDefaultPatterns(config);
        setDefaultPatterns(patterns);
    }, [config]);

    const handleChangePattern = (pat) => {
        let temp = getTemplatesForPattern(config, pat);
        let initValue = getInitialFormValueWithPreLoading(pat, temp);
        setInitialFormValue(initValue);
        setPattern(pat);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleAddNewField = () => {
        setDialogOpen(false);

        console.log('fieldType:' + fieldType)
        console.log('fieldName:' + fieldName);
        console.log('required:' + required);

        let type = getInputType(fieldType);
        let obj = {};
        obj['type'] = type;
        obj['name'] = _.camelCase(fieldName);
        obj['label'] = fieldName;
        obj['required'] = required ? 'yes' : 'no';
        if (type === 'select')
            obj['values'] = [];

        console.log(obj);
        //update the config
        let initValue = getInitialFormValueWithoutPreLoading();
        if (initValue.templateDetails.length > 0)
            initValue.templateDetails[0].templateInputDetails.push(obj);

        setInitialFormValue(initValue);
        //set default values
        setFieldName('');
        setFieldType('Text Box');
        setFieldNumber(0);
        setRequired(true);
    }


    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep} sx={{ mb: 1 }}>
                {newPatternSteps.map((label, index) => {
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
            {activeStep === newPatternSteps.length ? (
                <React.Fragment>
                    <br />
                    <Typography variant="overline" color="primary">
                        New pattern is saved
                    </Typography>
                    <br />
                    <br />
                    <Button
                        onClick={handleReset}
                        sx={{ maxHeight: 40, m: 1 }}
                        size="small"
                        variant="contained"
                        color="primary">
                        Create another pattern ?
                    </Button>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    {activeStep === 0 ? (
                        <React.Fragment>
                            <Divider>
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
                                <Pagination count={10} page={page} onChange={handlePageChange} sx={{ mt: 20 }} variant="outlined" shape="rounded" />
                            </Box>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>

                        </React.Fragment>
                    )}
                    {activeStep === 2 ? (
                        <React.Fragment>
                            {(pattern === 'Databricks') ? (
                                <React.Fragment>
                                    <Divider>
                                        <Typography variant="overline" color="primary">
                                            Available Templates for {pattern}
                                        </Typography>
                                    </Divider>
                                    <NewPatternForm pattern={pattern} initialFormValue={initialFormValue} handleDialogClickOpen={handleDialogClickOpen} />
                                </React.Fragment>) : (
                                <React.Fragment>
                                    {pattern === '' ? (
                                        <React.Fragment>
                                            <NewPatternForm pattern={pattern} handleDialogClickOpen={handleDialogClickOpen} />
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment>
                                            <br />
                                            <img alt='Coming Soon' src="/coming_soon.png" />
                                        </React.Fragment>
                                    )}

                                </React.Fragment>
                            )}
                        </React.Fragment>
                    ) : (
                        <React.Fragment>

                        </React.Fragment>
                    )}
                    {activeStep !== 0 ? (
                        <React.Fragment>
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
                                    disabled={activeStep === 0 || activeStep === 1 || (pattern === 'AI/ML' && pattern === 'Website' && pattern === 'Mulesoft')}>
                                    {activeStep === newPatternSteps.length - 1 ? 'Submit Form' : 'Next Step'}
                                </Button>
                            </Box>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                        </React.Fragment>
                    )}

                </React.Fragment>
            )
            }
            <Dialog
                open={dialogOpen}
                keepMounted
                onClose={handleDialogClose}
                maxWidth='sm'
                fullWidth
            >
                <DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleDialogClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <FormControl component="fieldset">
                        <FormLabel component="legend" key="fieldType">Select a field type to add</FormLabel>
                        <RadioGroup
                            row
                            value={fieldType}
                            onChange={handleFieldTypeChange}
                        >
                            {addFieldTypes.map((field) => {
                                return <FormControlLabel value={field} control={<Radio size='small' />} label={field} />
                            })}
                        </RadioGroup>
                    </FormControl>
                    <Divider sx={{ m: 2 }} />
                    <TextField
                        name="fieldName"
                        label="Enter Label Name"
                        variant="outlined"
                        size="small"
                        value={fieldName}
                        onChange={handleFieldNameChange}
                        sx={{ maxWidth: 300 }}
                    />
                    {(fieldType === 'Drop Down') ? (
                        <React.Fragment>
                            <TextField
                                name="fieldNumber"
                                label="Enter values in CSV format"
                                variant="outlined"
                                size="small"
                                value={fieldNumber}
                                onChange={handleFieldNumberChange}
                                sx={{ maxWidth: 300, ml: 2 }}
                            />
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                        </React.Fragment>
                    )}
                    <Divider sx={{ m: 2 }} />
                    <DialogContentText>
                        Is it a required field ?
                        <Switch
                            checked={required}
                            onChange={handleRequiredChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                            size="small"
                            sx={{ ml: 1 }}
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        sx={{ maxHeight: 40, m: 1 }}
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={handleAddNewField}
                    >
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </Box >
    );
}
