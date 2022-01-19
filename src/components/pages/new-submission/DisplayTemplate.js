import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useAlert } from "react-alert";

import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import { insertToArray } from '../../../configs/utils';

export default function DisplayTemplate(props) {
    const { initialFormValue, handleBack, handleSubmit } = props;
    const [expanded, setExpanded] = React.useState(false);
    const [formValue, setFormValue] = React.useState(initialFormValue);
    const [fieldsAddedCount, setFieldsAddedCount] = React.useState(0);
    const [fieldsRemovedCount, setFieldsRemovedCount] = React.useState(0);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleInput = (field, value) => {
        field.value = value;
    }
    const alert = useAlert();
    const validateFormValue = (formValue) => {
        console.log(formValue);
        var flag = true;
        var formData = formValue['templateDetails'];
        for (var i=0; i<formData.length; i++){
            var tempData = formData[i].templateInputDetails;
            for (var j=0; j<tempData.length; j++){
                if (tempData[j].required && tempData[j].required === 'yes' && (tempData[j].value === '' || !tempData[j].value )){
                    flag = false;
                    return flag;
                }
            }
        }
        return flag;
    }

    const handleAddSameField = (tempName, field) => {
        let templateDetails = initialFormValue.templateDetails;
        templateDetails.forEach(subForm => {
            if (subForm.templateName === tempName) {
                let fieldsArray = subForm.templateInputDetails;
                let index = fieldsArray.findIndex((obj) => obj.name === field.name);
                if (index > -1) {
                    let seqNo = field.sequenceNo;
                    let newField = Object.create(field);
                    newField.sequenceNo = seqNo + 1;
                    newField.required = 'no';
                    fieldsArray = insertToArray(fieldsArray, index+1, newField);
                    field.required = 'yes';
                    subForm.templateInputDetails = fieldsArray;
                }
            }
        });
        initialFormValue.templateDetails = templateDetails;
        let addedCount = fieldsAddedCount;
        addedCount++;
        setFieldsAddedCount(addedCount);
    }

    const handleRemoveSameField = (tempName, field) => {
        let templateDetails = initialFormValue.templateDetails;
        templateDetails.forEach(subForm => {
            if (subForm.templateName === tempName) {
                let fieldsArray = subForm.templateInputDetails;
                let index = fieldsArray.findIndex((obj) => obj.name === field.name);
                if (index > -1 && fieldsArray[index+1].required === 'no') {
                    fieldsArray.splice(index+1, 1);
                    subForm.templateInputDetails = fieldsArray;
                }
            }
        });
        initialFormValue.templateDetails = templateDetails;
        let removedCount = fieldsRemovedCount;
        removedCount++;
        setFieldsRemovedCount(removedCount);
        /*
        let addedCount = fieldsAddedCount;
        addedCount--;
        setFieldsAddedCount(addedCount);
        */
    }

    React.useEffect(() => {
        setFormValue(initialFormValue);
    }, [initialFormValue]);

    return (
        <Box>
            <form>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap', m: 2 }}>
                    {typeof formValue.templateDetails !== 'undefined' && formValue.templateDetails.map((subForm) => {
                        return (
                            <React.Fragment>
                                <Accordion expanded={expanded === subForm.templateName} onChange={handleChange(subForm.templateName)} sx={{ width: '80%' }}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                    >
                                        <Typography variant="subtitle2" align="center" color="primary">
                                            {subForm.templateName.toUpperCase()}
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {subForm.templateInputDetails.map((field) => {
                                            return (<React.Fragment>
                                                <Stack direction="row" spacing={1}>
                                                    <Typography variant="overline" sx={{ minWidth: 200, m: 1 }}>
                                                        {field.label}
                                                    </Typography>
                                                    <DisplayField field={field} handleInput={handleInput} />
                                                    {(typeof field.required !== 'undefined') && (field.required.toUpperCase() === 'YES') ? (
                                                        <React.Fragment>
                                                            <AddBoxIcon
                                                                fontSize="large"
                                                                color="success"
                                                                onClick={() => handleAddSameField(subForm.templateName, field)}
                                                            />
                                                            <IndeterminateCheckBoxIcon
                                                                fontSize="large"
                                                                sx={{ color: '#CC0000' }}
                                                                onClick={() => handleRemoveSameField(subForm.templateName, field)} />
                                                        </React.Fragment>) : (
                                                        <React.Fragment>
                                                        </React.Fragment>)}

                                                </Stack>
                                            </React.Fragment>)
                                        })}
                                    </AccordionDetails>
                                </Accordion>
                            </React.Fragment>
                        );
                    })}
                </Box>
            </form>
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
                    onClick={() => {
                        var result = validateFormValue(formValue);
                        if (result){
                            alert.success("Data Submitted successfully!");
                            handleSubmit(formValue, fieldsAddedCount, fieldsRemovedCount);
                        } else {
                            alert.error("Please fill mandatory Fields!");
                        }
                    }}>
                    Submit Form
                </Button>
            </Box>
        </Box>
    );
}

function DisplayField(props) {
    const { field, handleInput } = props;
    switch (field.type) {
        case 'textbox':
            return (
                <React.Fragment>
                    <TextField
                        name={field.name}
                        onInput={e => handleInput(field, e.target.value)}
                        variant="outlined"
                        size="small"
                        sx={{ maxWidth: 300 }}
                        required={(typeof field.required !== 'undefined') && (field.required.toUpperCase() === 'YES')}
                    />
                </React.Fragment>
            );
        case 'textarea':
            return (
                <React.Fragment>
                    <TextField
                        name={field.name}
                        onInput={e => handleInput(field, e.target.value)}
                        variant="outlined"
                        size="small"
                        multiline
                        rows={2}
                        sx={{ minWidth: 300, pb: 1 }}
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
                        onChange={e => handleInput(field, e.target.value)}
                        sx={{ maxWidth: 300, mt: 1 }}
                        fullWidth>
                        {field.values.length > 0 && field.values.map((option, index) => (
                            <MenuItem key={index} value = {option.value}>
                                {option.value}
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
