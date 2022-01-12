import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import NewPattern from './pages/NewPattern';
import NewSubmission from './pages/NewSubmission';
import Home from './pages/Home';
import ShowPattern from './pages/ShowPattern';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            key={index}
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function DisplayContent() {
    const [value, setValue] = React.useState(0);

    const handleTabsChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleTabsChange}>
                    <Tab label="Dashboard" {...a11yProps(0)} />
                    <Tab label="New Submission" {...a11yProps(1)} />
                    <Tab label="Add Pattern/Template" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Home />
            </TabPanel >
            <TabPanel value={value} index={1}>
                <ShowPattern isNewSubmission={true} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <ShowPattern isNewSubmission={false} />
            </TabPanel>
        </Box >
    );
}
