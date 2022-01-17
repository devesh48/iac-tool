import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';

import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import { insertToArray } from '../../../configs/utils';

export default function DisplayTemplate(props) {
    const { formDetails } = props;
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleInput = (field, value) => {
        field.value = value;
    }

    const handleAddSameField = (tempName, field) => {
        //console.log("Field to be added");
        //console.log(field);
        let templateDetails = formDetails.templateDetails;
        templateDetails.forEach(subForm => {
            if (subForm.templateName === tempName) {
                let fieldsArray = subForm.templateInputDetails;
                let index = fieldsArray.findIndex((obj) => obj.name === field.name);
                if (index > -1) {
                    fieldsArray = insertToArray(fieldsArray, index, field);
                    subForm.templateInputDetails = fieldsArray;
                }
            }
        });
    }

    const handleRemoveSameField = (tempName, field) => {
        //console.log("Field to be added");
        //console.log(field);
        let templateDetails = formDetails.templateDetails;
        templateDetails.forEach(subForm => {
            if (subForm.templateName === tempName) {
                let fieldsArray = subForm.templateInputDetails;
                let index = fieldsArray.findIndex((obj) => obj.name === field.name);
                if (index > -1) {
                    fieldsArray.splice(index, 1);
                    subForm.templateInputDetails = fieldsArray;
                }
            }
        });
    }

    return (
        <React.Fragment>
            {typeof formDetails.templateDetails !== 'undefined' && formDetails.templateDetails.map((subForm) => {
                return (
                    <React.Fragment>
                        <Accordion expanded={expanded === subForm.templateName} onChange={handleChange(subForm.templateName)} sx={{ width: '80%' }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography variant="overline" align="center" color="primary">
                                    {subForm.templateName}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {subForm.templateInputDetails.map((field) => {
                                    return (<React.Fragment>
                                        <Stack direction="row" spacing={1}>
                                            <Typography variant="overline" color="primary" sx={{ minWidth: 200, m: 1 }}>
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
        </React.Fragment>
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
                    />
                </React.Fragment>
            );
        case 'textarea':
            return (
                <React.Fragment>
                    <TextField
                        name={field.name}
                        value={field.value}
                        onInput={e => handleInput(field, e.target.value)}
                        variant="outlined"
                        size="small"
                        multiline
                        rows={2}
                        sx={{ minWidth: 300 }}
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
                        fullWidth>
                        {field.values.length > 0 && field.values.map((option, index) => (
                            <MenuItem key={index}>
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
