import * as React from 'react';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function NewPatternForm(props) {
    const { initialFormValue, handleDialogClickOpen } = props;
    const [formValue, setFormValue] = React.useState('');
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleInput = (field, value) => {
        field.value = value;
    }
    React.useEffect(() => {
        setFormValue(initialFormValue);
    }, [initialFormValue]);

    if (typeof formValue === 'undefined') {
        return (
            <Box sx={{ height: '20vh' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button
                        sx={{ maxHeight: 40 }}
                        size="small"
                        variant="contained"
                        color="primary"
                        disabled
                        onClick={handleDialogClickOpen}>
                        Add New Field
                    </Button>
                </Box>
                <Stack direction="row" spacing={1}>
                    <Typography variant="overline" color="primary" sx={{ minWidth: 200, m: 1 }}>
                        Enter New Pattern Name
                    </Typography>
                    <TextField
                        variant="outlined"
                        size="small"
                        sx={{ maxWidth: 300 }}
                        required
                        label="Required"
                        defaultValue=" "
                        autoFocus
                    />
                </Stack>
                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                    <Typography variant="overline" color="primary" sx={{ minWidth: 200, m: 1 }}>
                        Enter New Template Name
                    </Typography>
                    <TextField
                        variant="outlined"
                        size="small"
                        sx={{ maxWidth: 300 }}
                        required
                        label="Required"
                        defaultValue=" "
                    />
                </Stack>

            </Box>
        )
    }

    return (
        <Box>
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
                                    <Typography variant="overline" align="center" color="primary">
                                        {subForm.templateName}
                                    </Typography>

                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        <Button
                                            sx={{ maxHeight: 40 }}
                                            size="small"
                                            variant="contained"
                                            color="primary"
                                            onClick={handleDialogClickOpen}>
                                            Add New Field
                                        </Button>
                                    </Box>
                                    <Stack spacing={1}>
                                        {subForm.templateInputDetails.map((field) => {
                                            return (
                                                <React.Fragment>
                                                    <DisplayField field={field} handleInput={handleInput} />
                                                </React.Fragment>
                                            )
                                        })}
                                    </Stack>
                                </AccordionDetails>
                            </Accordion>
                        </React.Fragment>
                    );
                })}
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
                        onInput={e => handleInput(field, e.target.value)}
                        variant="outlined"
                        size="small"
                        sx={{ maxWidth: 300 }}
                        label={field.label}
                        placeholder={field.value}
                    />
                </React.Fragment>
            );
        case 'textarea':
            return (
                <React.Fragment>
                    <TextField
                        onInput={e => handleInput(field, e.target.value)}
                        variant="outlined"
                        size="small"
                        multiline
                        rows={2}
                        sx={{ maxWidth: 300 }}
                        label={field.label}
                        placeholder={field.value}
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