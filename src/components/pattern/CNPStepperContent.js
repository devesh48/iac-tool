import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CNPGeneralForm from './CNPGeneralForm';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import CNPJsonTemplateForm from './CNPJsonTemplateForm';
import CNPDisplayFieldsArray from './CNPDisplayFieldsArray';

export default function CNPStepperContent(props) {
    let {
        activeStep,
        patternName,
        setPatternName,
        subFormName,
        setSubFormName,
        stepsArray,
        fieldsArray,
        currentStep,
        handleNext,
        handleBack,
        handleReset,
        handleRemoveField,
        jsonTemplate,
        setJSONTemplate
    } = props;
    return (
        <React.Fragment>
            <Box sx={{ flexDirection: 'column', alignContent: 'space-between' }}>
                {/* content of actual form */}
                <Box sx={{ minHeight: 450 }}>
                    {/* first step of general details */}
                    {activeStep === 0 ? (
                        <React.Fragment>
                            <Divider sx={{ m: 2 }}>
                                <Typography variant="overline" color="primary">
                                    General details
                                </Typography>
                            </Divider>
                            <CNPGeneralForm
                                patternName={patternName}
                                setPatternName={setPatternName}
                                subFormName={subFormName}
                                setSubFormName={setSubFormName} />
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                        </React.Fragment>
                    )}
                    {/* Display last step */}
                    {(currentStep === 'Add JSON template') ? (
                        <React.Fragment>
                            <Divider sx={{ m: 2 }}>
                                <Typography variant="overline" color="primary">
                                    JSON template
                                </Typography>
                            </Divider>
                            <CNPJsonTemplateForm
                                jsonTemplate={jsonTemplate}
                                setJSONTemplate={setJSONTemplate} />
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                        </React.Fragment>
                    )}
                    {/* Display fields added */}
                    {(fieldsArray.length > 0) ? (
                        <React.Fragment>
                            <Divider sx={{ m: 2 }}>
                                <Typography variant="overline" color="primary">
                                    List of fields added for {currentStep}
                                </Typography>
                            </Divider>
                            <CNPDisplayFieldsArray fieldsArray={fieldsArray} handleRemoveField={handleRemoveField} />
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                        </React.Fragment>
                    )}

                    {/* after last step or new pattern submission */}
                    {activeStep === stepsArray.length && (
                        <Button
                            onClick={handleReset}
                            sx={{ maxHeight: 40, m:5 }}
                            size="small"
                            variant="contained"
                            color="primary">
                            Create Another Pattern ?
                        </Button>
                    )}
                </Box>
                {/* steps handling buttons */}
                <Box>
                    {(activeStep < stepsArray.length) ? (
                        <React.Fragment>
                            <Box sx={{
                                mb: 2,
                                display: 'flex',
                                alignItems: 'baseline',
                                justifyContent: 'flex-end'
                            }}>

                                <Button
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{ maxHeight: 40, mt: 2, mr: 1 }}
                                    size="small"
                                    variant="contained"
                                    color="primary"
                                >
                                    Back
                                </Button>
                                <Button
                                    onClick={handleNext}
                                    sx={{ maxHeight: 40, mt: 2, mr: 1 }}
                                    size="small"
                                    variant="contained"
                                    color="primary"
                                    disabled={(patternName === '' || subFormName === '')}
                                >
                                    {activeStep === stepsArray.length - 1 ? 'Save' : 'Next'}
                                </Button>
                            </Box>
                        </React.Fragment>
                    ) : (<React.Fragment></React.Fragment>)}
                </Box>
            </Box>
        </React.Fragment>
    );
}