import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
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

import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';

import { fetchJSON } from '../../configs/utils';
import { addFieldTypes } from '../../configs/constants';

export default function DisplayTemplate(props) {
    const { template, isNewSubmission, isNonExistingPattern } = props;
    const [config, setConfig] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [fieldType, setFieldType] = React.useState('Text Box');
    const [required, setRequired] = React.useState(true);

    React.useEffect(() => {
        let json = fetchJSON(template);
        setConfig(json);
    }, [template]);

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

    return (
        <Box sx={{ m: 1 }}>
            {(config === '' && typeof config.templateDetails === 'undefined') ? (
                <React.Fragment>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    {config.templateDetails.map((field) => {
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
                                            <TextField
                                                name={field.name}
                                                variant="outlined"
                                                size="small"
                                                sx={{ maxWidth: 300 }}
                                            />
                                        </Grid>
                                        {(typeof field.required !== 'undefined') && (field.required.toUpperCase() === 'YES') ? (
                                            <React.Fragment>
                                                <Grid item xs={1}>
                                                    <AddBoxIcon fontSize="large" color="success" />
                                                </Grid>
                                                <Grid item xs={1}>
                                                    <IndeterminateCheckBoxIcon fontSize="large" sx={{ color: '#CC0000' }} />
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
                        sx={{ maxWidth: 300 }}
                    />
                    {(fieldType === 'Drop Down') ? (
                        <React.Fragment>
                            <TextField
                                name="fieldNumber"
                                label="Enter number of values"
                                variant="outlined"
                                size="small"
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
                        onClick={handleDialogClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        sx={{ maxHeight: 40, m: 1 }}
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={handleDialogClose}
                    >
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}