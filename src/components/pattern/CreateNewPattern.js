import * as React from 'react';
import Box from '@mui/material/Box';

import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import HelpIcon from '@mui/icons-material/Help';

import axios from 'axios';
import { CustomTooltip } from '../common/CustomTooltip';

import { CustomAlert } from '../common/CustomAlert';
import { addFieldTypes, awsTypes } from '../../config/constants';
import { neonBlue } from '../../config/colors';
import { getInputType, getToolTipTitle, getToolTipPlacement } from '../../config/utils';
import CNPForm from './CNPForm';
var _ = require('lodash');

function Item(props) {
    const { sx, ...other } = props;
    return (
        <Box
            sx={{
                ...sx,
            }}
            {...other}
        />
    );
}

export default function CreateNewPattern(props) {
    let { setType } = props;
    const [patternName, setPatternName] = React.useState('');
    const [subFormName, setSubFormName] = React.useState('');
    const [fieldType, setFieldType] = React.useState('Text Box');
    const [fieldName, setFieldName] = React.useState('');
    const [fieldValues, setFieldValues] = React.useState([]);
    const [required, setRequired] = React.useState(true);
    const [awsType, setAWSType] = React.useState(awsTypes[0]);
    const [currentStep, setCurrentStep] = React.useState('');
    const [jsonTemplate, setJSONTemplate] = React.useState('');

    const [formValidationAlert, setFormValidationAlert] = React.useState(false);

    const handleFieldTypeChange = (event) => {
        setFieldType(event.target.value);
    };
    const handleFieldNameChange = (event) => {
        setFieldName(event.target.value);
    };
    const handleFieldValuesChange = (event) => {
        setFieldValues(event.target.value);
    };
    const handleRequiredChange = (event) => {
        setRequired(event.target.checked);
    };
    const handleAWSType = (event) => {
        setAWSType(event.target.value);
    };

    const [fieldsArray, setFieldsArray] = React.useState([]);
    const [formJson, setFormJson] = React.useState({
        "patternName": "",
        "templateDetails": [],
        "jsonTemplate": {
        }
    });

    const handleReset = () => {
        setFieldType('Text Box');
        setFieldName('');
        setRequired(true);
        setFieldValues([]);
        setAWSType(awsTypes[0]);
    }

    const handleAddField = () => {
        //validation for adding fields
        //1. field name should not be empty
        //2. if it is drop down field, values should not be empty
        let valid = true;
        if (fieldName === '') {
            valid = false;
        }
        if (fieldType === 'Drop Down' && fieldValues.length < 1) {
            valid = false;
        }
        if (valid) {
            //set field details
            let type = getInputType(fieldType);
            let fieldObj = {};
            fieldObj['type'] = type;
            fieldObj['name'] = _.camelCase(fieldName);
            fieldObj['label'] = fieldName;
            fieldObj['awsType'] = awsType;
            fieldObj['required'] = required ? 'yes' : 'no';
            if (fieldType === 'Drop Down' && fieldValues.length > 0)
                fieldObj['values'] = fieldValues.split(',');

            //console.log(fieldObj);
            let arr = fieldsArray;
            arr.push(fieldObj);
            setFieldsArray(arr);
            //set default values for fields
            handleReset();
            //send values to form json
            handleAddFormJson(currentStep, fieldObj);
        } else {
            setFormValidationAlert(true);
        }
    }

    const handleAddFormJson = (templateName, fieldDetailsObj) => {
        //check patternName
        let tempFormJSON = formJson;
        if (tempFormJSON['patternName'] === '') {
            tempFormJSON.patternName = patternName;
        }

        //check templateDetails array
        let templateArr = tempFormJSON['templateDetails'];
        let templateObj = {};
        let index = templateArr.findIndex((obj) => obj.templateName === templateName);
        if (index > -1) {
            templateObj = templateArr[index];
        } else {
            templateObj['templateName'] = templateName;
            templateObj['templateInputDetails'] = [];
            templateArr.push(templateObj);
        }

        //find the subform for the field to be added
        index = templateArr.findIndex((obj) => obj.templateName === templateName);
        if (index > -1) {
            templateObj = templateArr[index];
            //adding input fields array
            let fieldArr = templateObj['templateInputDetails'];
            fieldArr.push(fieldDetailsObj);
            templateObj['templateInputDetails'] = fieldArr;
        }

        //adding sub form details
        tempFormJSON['templateDetails'] = templateArr;
        setFormJson(tempFormJSON);
    }

    const handleRemoveField = (field) => {
        let fieldsArr = fieldsArray;
        let index = fieldsArr.findIndex((obj) => obj.label === field.label);
        if (index > -1) {
            fieldsArr.splice(index, 1);
            setFieldsArray(fieldsArr);
            handleReset();
            //remove value from form json
            handleRemoveFormJson(currentStep, field);
        }
    }

    const handleRemoveFormJson = (templateName, fieldDetailsObj) => {
        let tempFormJSON = formJson;
        let templateArr = tempFormJSON['templateDetails'];
        let index = templateArr.findIndex((obj) => obj.templateName === templateName);
        if (index > -1) {
            let templateObj = templateArr[index];
            let fieldArr = templateObj['templateInputDetails'];
            //removing field from form
            let removeFieldIndex = fieldArr.findIndex((obj) => obj.label === fieldDetailsObj.label);
            if (removeFieldIndex > -1) {
                fieldArr.splice(removeFieldIndex, 1);
                templateObj['templateInputDetails'] = fieldArr;
            }
        }
        //updating sub form details
        tempFormJSON['templateDetails'] = templateArr;
        setFormJson(tempFormJSON);
    }

    const handleSubmit = () => {
        //check patternName
        formJson['jsonTemplate'] = jsonTemplate;
        formJson['createTs'] = new Date();
        console.log('form details submitted to save new pattern');
        console.log(formJson);
        axios.post('https://iac-tool.herokuapp.com/addNewPattern', formJson)
            .then(res => {
                if (res.status === "200" && res.data) {
                    console.log("Post request sent successfully to save new pattern");
                    console.log(res.data);
                }
            })
            .catch(err => {
                console.log("Failed to send post request to save new pattern");
                console.log(err);
            })
        handleReset();
        setFormJson({
            "patternName": "",
            "templateDetails": [],
            "jsonTemplate": {
            }
        })
    }

    return (
        <React.Fragment>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >
                <Item
                    sx={{
                        width: 1050,
                        border: '1px solid',
                        borderColor: (theme) => 'grey.300',
                        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
                        borderRadius: 2,
                    }}
                >
                    {/* Stepper + Stepper Content */}
                    <CNPForm
                        patternName={patternName}
                        setPatternName={setPatternName}
                        subFormName={subFormName}
                        setSubFormName={setSubFormName}
                        currentStep={currentStep}
                        setCurrentStep={setCurrentStep}
                        fieldsArray={fieldsArray}
                        setFieldsArray={setFieldsArray}
                        handleRemoveField={handleRemoveField}
                        jsonTemplate={jsonTemplate}
                        setJSONTemplate={setJSONTemplate}
                        handleSubmit={handleSubmit}
                        formJson={formJson}
                        setType={setType}
                    />
                </Item>
                <Item
                    sx={{
                        width: 400,
                        height: '100%',
                    }}
                >
                    {/* Add field form */}
                    {(typeof currentStep === 'undefined' || currentStep === 'General' || currentStep === 'Add JSON template') ? (
                        <React.Fragment>
                        </React.Fragment>
                    ) :
                        (<React.Fragment>
                            <Box sx={{
                                border: '1px solid',
                                borderColor: (theme) => 'grey.300',
                                borderRadius: 2,
                            }}>
                                <List>
                                    <Typography variant="overline" align="center" color="primary">
                                        Fill below to add a new field to subform
                                    </Typography>
                                    <Divider sx={{ m: 1 }} />
                                    <ListItem key={'Select a field type to add'}>
                                        <FormControl component="fieldset">
                                            <FormLabel component="legend" key="fieldType">
                                                <Typography variant="overline" align="center" color="primary">
                                                    Field Type
                                                </Typography>
                                            </FormLabel>
                                            <RadioGroup
                                                row
                                                value={fieldType}
                                                onChange={handleFieldTypeChange}
                                                key="description"
                                            >
                                                {addFieldTypes.map((field) => {
                                                    return <FormControlLabel key={field} value={field} control={<Radio size='small' />} label={
                                                        <Typography variant="overline" align="center">
                                                            {field}
                                                        </Typography>
                                                    } />
                                                })}
                                            </RadioGroup>
                                        </FormControl>
                                    </ListItem>
                                    <Divider sx={{ m: 1 }} />
                                    <ListItem key={'fieldName'}>
                                        <Typography variant="overline" align="center" color="primary" sx={{ pb: 3 }}>
                                            Field Label
                                        </Typography>
                                        <TextField
                                            name="fieldName"
                                            variant="outlined"
                                            size="small"
                                            value={fieldName}
                                            onChange={handleFieldNameChange}
                                            helperText="Required*"
                                            autoFocus
                                            error={fieldName === '' ? true : false}
                                            sx={{ maxWidth: 200, ml: 3 }}
                                        />
                                        <CustomTooltip title={getToolTipTitle(2)} placement={getToolTipPlacement(2)}>
                                            <HelpIcon
                                                sx={{ color: neonBlue, ml: 1, pb: 3 }} />
                                        </CustomTooltip>
                                    </ListItem>
                                    {(fieldType === 'Drop Down') ? (
                                        <React.Fragment>
                                            <ListItem key={'Drop Down'}>
                                                <Typography variant="overline" align="center" color="primary" sx={{ pb: 3 }}>
                                                    Field Values
                                                </Typography>
                                                <TextField
                                                    name="fieldValues"
                                                    variant="outlined"
                                                    size="small"
                                                    multiline
                                                    rows={3}
                                                    value={fieldValues}
                                                    onChange={handleFieldValuesChange}
                                                    sx={{ maxWidth: 200, ml: 2 }}
                                                    helperText="Required*"
                                                    error={fieldValues.length === 0 ? true : false}
                                                />
                                                <CustomTooltip title={getToolTipTitle(3)} placement={getToolTipPlacement(3)}>
                                                    <HelpIcon
                                                        sx={{ color: neonBlue, ml: 1, pb: 3 }} />
                                                </CustomTooltip>
                                            </ListItem>
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment>
                                        </React.Fragment>
                                    )}
                                    <Divider sx={{ m: 1 }} />
                                    <ListItem key={'Required'}>
                                        <Typography variant="overline" align="center" color="primary">
                                            Is it a required field ?
                                        </Typography>
                                        <Switch
                                            checked={required}
                                            onChange={handleRequiredChange}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                            size="small"
                                            sx={{ ml: 1 }}
                                        />
                                    </ListItem>
                                    <Divider sx={{ m: 1 }} />
                                    <ListItem key={'AWS Type'}>
                                        <Typography variant="overline" align="center" color="primary">
                                            AWS Type
                                        </Typography>
                                        <Select
                                            value={awsType}
                                            onChange={handleAWSType}
                                            sx={{ minWidth: 200, ml: 5, maxHeight: 40 }}
                                        >
                                            {awsTypes.map((option, index) => {
                                                return (
                                                    <MenuItem key={index} value={option} dense divider>
                                                        <Typography variant="overline" align="center">
                                                            {option}
                                                        </Typography>
                                                    </MenuItem>
                                                );
                                            })}
                                        </Select>
                                    </ListItem>
                                    <Divider sx={{ m: 1 }} />
                                    <Button
                                        sx={{ maxHeight: 40 }}
                                        size="small"
                                        variant="contained"
                                        color="primary"
                                        onClick={handleAddField}
                                        disabled={patternName === '' && subFormName === ''}>
                                        Add
                                    </Button>
                                </List>
                            </Box>
                        </React.Fragment>)}
                </Item>
            </Box>
            <Snackbar open={formValidationAlert} autoHideDuration={7000} onClose={() => setFormValidationAlert(false)}>
                <CustomAlert variant="outlined" severity="error" sx={{ maxWidth: 400 }}>
                    Mandatory fields in the form are not filled
                </CustomAlert>
            </Snackbar>
        </React.Fragment>
    );
}