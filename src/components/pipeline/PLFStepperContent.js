import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import PLFProjectInfoForm from './PLFProjectInfoForm';
import PNFDisplayFieldsArray from './PNFDisplayFieldsArray';
import { CustomTooltip } from '../common/CustomTooltip';
import { getToolTipTitle, getToolTipPlacement } from '../../config/utils';

export default function PLFStepperContent(props) {
    let {
        activeStep,
        stepsArray,
        handleNext,
        handleBack,
        handleReset,
        currentStep,
        setCurrentStep,
        patternNameSelected,
        setPatternNameSelected,
        patternDetails,
        gitURL,
        setGitURL,
        gitToken,
        setGitToken,
        gitRepoName,
        setGitRepoName,
        patternNameList,
        getPatternDetail,
        currPattern,
        handleSubmitPattern
    } = props;



    const handlePatternChange = (event) => {
        setPatternNameSelected(event.target.value);
    };

    const handleSelectChange = (event) => {
        handlePatternChange(event);
        getPatternDetail(event.target.value);
    }

    React.useEffect(() => {
        //console.log(sessionStorage.getItem('sohel'));
        setCurrentStep(stepsArray[0]);
    }, [stepsArray.length]);

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
                                    Choose a pattern from below
                                </Typography>
                            </Divider>
                            <Select
                                defaultValue=""
                                value={patternNameSelected}
                                onChange={handleSelectChange}
                                sx={{ maxHeight: 40, minWidth: 200, }}
                            >
                                {patternNameList.map((pat, index) => {
                                    return (
                                        <MenuItem key={index} value={pat} divider>
                                            <Typography variant="overline" align="center">
                                                {pat}
                                            </Typography>
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                        </React.Fragment>
                    )}
                    {(activeStep > 0 && (activeStep < stepsArray.length)) ? (
                        <React.Fragment>
                            <Divider sx={{ m: 2 }}>
                                <Typography variant="overline" color="primary">
                                    Fill below fields for subform : {stepsArray[activeStep]}
                                </Typography>
                            </Divider>
                            <PNFDisplayFieldsArray currStep={stepsArray[activeStep]} currPattern={currPattern} />
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                        </React.Fragment>
                    )}
                    {/* Display last step */}
                    {(stepsArray[activeStep] === 'Project Information') ? (
                        <React.Fragment>
                            <PLFProjectInfoForm
                                gitURL={gitURL}
                                setGitURL={setGitURL}
                                gitToken={gitToken}
                                setGitToken={setGitToken}
                                gitRepoName={gitRepoName}
                                setGitRepoName={setGitRepoName} />
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                        </React.Fragment>
                    )}
                    {/* after last step or new pipeline submission */}
                    {activeStep === stepsArray.length && (
                        <Button
                            onClick={handleReset}
                            sx={{ maxHeight: 40, m: 5 }}
                            size="small"
                            variant="contained"
                            color="primary">
                            Create Another Pipeline ?
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
                                    onClick={handleBack}
                                    sx={{ maxHeight: 40, mt: 2, mr: 1 }}
                                    size="small"
                                    variant="contained"
                                    color="primary"
                                    disabled={activeStep === 0}
                                >
                                    Back
                                </Button>
                                <CustomTooltip title={getToolTipTitle(9)} placement={getToolTipPlacement(9)}>
                                    <Button
                                        onClick={handleSubmitPattern}
                                        sx={{ maxHeight: 40, mt: 2, mr: 1 }}
                                        size="small"
                                        variant="contained"
                                        color="primary"
                                        disabled={activeStep <= 1}
                                    >
                                        Save
                                    </Button>
                                </CustomTooltip>
                                <CustomTooltip title={getToolTipTitle(8)} placement={getToolTipPlacement(8)}>
                                    <Button
                                        onClick={handleNext}
                                        sx={{ maxHeight: 40, mt: 2, mr: 1 }}
                                        size="small"
                                        variant="contained"
                                        color="primary"
                                        disabled={activeStep === 0}
                                    >
                                        {activeStep === stepsArray.length - 1 ? 'Submit' : 'Next'}
                                    </Button>
                                </CustomTooltip>

                            </Box>
                        </React.Fragment>
                    ) : (<React.Fragment></React.Fragment>)}
                </Box>
            </Box>
        </React.Fragment >
    );
}