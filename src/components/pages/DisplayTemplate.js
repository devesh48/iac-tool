import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
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
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';

import CloseIcon from '@mui/icons-material/Close';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';

import { fetchFormFieldsForTemplate, getInputType, insertToArray } from '../../configs/utils';
import { addFieldTypes } from '../../configs/constants';

var _ = require('lodash');

export default function DisplayTemplate(props) {
    const { pattern, template, isNewSubmission, isNonExistingPattern } = props;
    const [config, setConfig] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [fieldType, setFieldType] = React.useState('Text Box');
    const [fieldName, setFieldName] = React.useState('');
    const [fieldNumber, setFieldNumber] = React.useState(0);
    const [required, setRequired] = React.useState(true);


    React.useEffect(() => {
        let array = [];
        if ((typeof pattern !== 'undefined' && typeof template !== 'undefined') && (pattern !== '' && template !== '')) {
            array = fetchFormFieldsForTemplate(pattern, template);
        }
        console.log(array)
        setConfig(array);
    }, [pattern, template]);

    const handleDialogClickOpen = () => {
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
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

    const handleAddNewField = () => {
        setOpen(false);
        /*
        console.log('fieldType:' + fieldType)
        console.log('fieldName:' + fieldName);
        console.log('required:' + required);
        */
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
        let existingConfig = config;
        existingConfig.push(obj);
        setConfig(existingConfig);
        //set default values
        setFieldName('');
        setFieldType('Text Box');
        setFieldNumber(0);
        setRequired(true);
    }

    const handleAddSameField = (field) => {
        //console.log("Field to be added");
        //console.log(field);
        let existingConfig = config;
        let index = existingConfig.findIndex((obj) => obj.name === field.name);
        //console.log('index:' + index);
        if (index > -1) {
            existingConfig = insertToArray(existingConfig, index, field);
        }
        setConfig(existingConfig);
    }

    const handleRemoveSameField = (field) => {
        //console.log("Field to be added");
        //console.log(field);
        let existingConfig = config;
        let index = existingConfig.findIndex((obj) => obj.name === field.name);
        console.log('index:' + index);
        if (index > -1) {
            existingConfig.splice(index, 1);
        }
        //console.log(existingConfig);
        setConfig(existingConfig);
    }

    return (
        <Box sx={{ m: 2 }}>
            {(typeof config === 'undefined' && config.length === 0) ? (
                <React.Fragment>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    {config.map((field) => {
                        return (
                            <React.Fragment>
                                <Box sx={{ flexGrow: 1, m: 2 }}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={2}>
                                            <Box sx={{ alignItems: 'center', textAlign: 'right' }}>
                                                <Typography variant="overline" color="primary">
                                                    {field.label}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <DisplayField field={field} />
                                        </Grid>
                                        {(typeof field.required !== 'undefined') && (field.required.toUpperCase() === 'YES') ? (
                                            <React.Fragment>
                                                <Grid item xs={1}>
                                                    <AddBoxIcon
                                                        fontSize="large"
                                                        color="success"
                                                        onClick={() => handleAddSameField(field)}
                                                    />
                                                </Grid>
                                                <Grid item xs={1}>
                                                    <IndeterminateCheckBoxIcon
                                                        fontSize="large"
                                                        sx={{ color: '#CC0000' }}
                                                        onClick={() => handleRemoveSameField(field)} />
                                                </Grid>
                                            </React.Fragment>) : (
                                            <React.Fragment>
                                            </React.Fragment>)}
                                    </Grid>
                                </Box>
                            </React.Fragment>
                        )
                    })
                    }
                </React.Fragment>
            )}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap', m: 2 }}>
                {(isNonExistingPattern === false) ? (
                    <React.Fragment>
                        <Button
                            sx={{ maxHeight: 40, mr: 1 }}
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={props.handleBack}
                        >
                            Back
                        </Button>
                        <Button
                            sx={{ maxHeight: 40, mr: 1 }}
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={props.handleFinish}
                        >
                            Submit
                        </Button>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                    </React.Fragment>
                )}
                {(isNewSubmission === false) ? (
                    <React.Fragment>
                        <Button
                            sx={{ maxHeight: 40, mr: 1 }}
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={handleDialogClickOpen}
                        >
                            Add New Field
                        </Button>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                    </React.Fragment>
                )}
            </Box>
            <Dialog
                open={open}
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
                        <FormLabel component="legend">{'Select a field type to add'}</FormLabel>
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
                                label="Enter number of values"
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
        </Box>
    );
}

function DisplayField(props) {
    const { field } = props;
    switch (field.type) {
        case 'textbox':
            return (
                <React.Fragment>
                    <TextField
                        name={field.name}
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
                        variant="outlined"
                        size="small"
                        multiline
                        rows={2}
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