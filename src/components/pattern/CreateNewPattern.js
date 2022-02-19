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


import { addFieldTypes, awsTypes } from '../../config/constants';
import { getInputType } from '../../config/utils';
import CNPForm from './CNPForm';


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


export default function CreateNewPattern() {
    const [patternName, setPatternName] = React.useState('');
    const [subFormName, setSubFormName] = React.useState('');
    const [fieldType, setFieldType] = React.useState('Text Box');
    const [fieldName, setFieldName] = React.useState('');
    const [fieldValues, setFieldValues] = React.useState([]);
    const [required, setRequired] = React.useState(true);
    const [awsType, setAWSType] = React.useState(awsTypes[0]);

    const handlePatternNameChange = (event) => {
        setPatternName(event.target.value);
    };

    const handleSubFormNameChange = (event) => {
        setSubFormName(event.target.value);
    };

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

    const handleReset = () => {
        setFieldType('Text Box');
        setFieldName('');
        setRequired(true);
        setFieldValues([]);
        setAWSType(awsTypes[0]);
    }

    const handleAddField = () => {
        //console.log('fieldType:' + fieldType);
        //console.log('fieldName:' + fieldName);
        //console.log('required:' + required);
        //console.log('fieldValues:' + fieldValues);
        let type = getInputType(fieldType);
        let obj = {};
        obj['type'] = type;
        obj['name'] = fieldName;
        obj['label'] = fieldName;
        obj['awsType'] = awsType;
        obj['required'] = required ? 'yes' : 'no';
        if (type === 'select')
            obj['values'] = fieldValues.split(',');

        console.log(obj);
        let arr = fieldsArray;
        arr.push(obj);
        setFieldsArray(arr);
        //set default values
        handleReset();
    }

    const handleRemoveField = (field) => {
        console.log("Remove field===");
        console.log(field);
        let fieldsArr = fieldsArray;
        let index = fieldsArr.findIndex((obj) => obj.name === field.name);
        if (index > -1) {
            fieldsArr.splice(index + 1, 1);
            setFieldsArray(fieldsArr);
            handleReset();
        }
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
                        width: 1000,
                    }}
                >
                    <CNPForm
                        patternName={patternName}
                        handlePatternNameChange={handlePatternNameChange}
                        subFormName={subFormName}
                        handleSubFormNameChange={handleSubFormNameChange}
                        fieldsArray={fieldsArray}
                        handleRemoveField={handleRemoveField}
                    />
                </Item>
                <Item
                    sx={{
                        width: 380,
                        height: 525,
                        border: '1px solid',
                        borderColor: (theme) => 'grey.300',
                        borderRadius: 2,
                    }}
                >
                    <List>
                        <Typography variant="overline" align="center" color="primary">
                            Fill below to add a new field
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
                                        return <FormControlLabel key={field} value={field} control={<Radio size='small' />} label={field} />
                                    })}
                                </RadioGroup>
                            </FormControl>
                        </ListItem>
                        <Divider sx={{ m: 1 }} />
                        <ListItem key={'fieldName'}>
                            <Typography variant="overline" align="center" color="primary">
                                Label Name
                            </Typography>
                            <TextField
                                name="fieldName"
                                variant="outlined"
                                size="small"
                                value={fieldName}
                                onChange={handleFieldNameChange}
                                sx={{ maxWidth: 200, ml: 3 }}
                            />
                        </ListItem>
                        {(fieldType === 'Drop Down') ? (
                            <React.Fragment>
                                <ListItem key={'Drop Down'}>
                                    <Typography variant="overline" align="center" color="primary">
                                        Values in CSV
                                    </Typography>
                                    <TextField
                                        name="fieldValues"
                                        variant="outlined"
                                        size="small"
                                        multiline
                                        rows={3}
                                        value={fieldValues}
                                        onChange={handleFieldValuesChange}
                                        sx={{ maxWidth: 200, ml: 1 }}
                                    />
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
                                        <MenuItem key={index} value={option}>
                                            {option}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </ListItem>
                        <Divider sx={{ m: 1 }} />
                        <Button
                            sx={{ maxHeight: 40, mt: 2 }}
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={handleAddField}
                            disabled={patternName === '' && subFormName === ''}>
                            Add
                        </Button>
                    </List>
                </Item>
            </Box>
        </React.Fragment>
    );
}