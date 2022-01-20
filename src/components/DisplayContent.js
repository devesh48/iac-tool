import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Dashboard from './pages/dashboard/Dashboard';
import DisplaySubmission from './pages/new-submission/DisplaySubmission';
import NewPattern from './pages/new-pattern/NewPattern';
import axios from 'axios';

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
const STATE_KEY = "sohel";
sessionStorage.setItem(STATE_KEY, 0);

export default function DisplayContent() {
    const [value, setValue] = React.useState(0);
    const [flag, setFlag] = React.useState(false);
    const [config, setConfig] = React.useState({});
    //var [inProgressData, setInProgressData] = React.useState({});
    const handleTabsChange = (event, newValue) => {
        setValue(newValue);
    };
    React.useEffect(() => {
        sessionStorage.setItem(STATE_KEY, value);
        sessionStorage.getItem('submissionId');
    }, [value]);



    React.useEffect(() => {
        if (sessionStorage.getItem('submissionId') && flag){
            axios.get('http://localhost:3001/getStoredProjectConfig/' + sessionStorage.getItem('submissionId'))
            .then(res => {
                setConfig(res.data);
            })
            .catch(err => {
                console.log("Failed to fetch config details");
                console.log(err);
            })

        } else {
            axios.get('https://iac-tool.herokuapp.com/loadAllConfig')
            .then(res => {
                if (res.data.length > 0) {
                    console.log(res.data)
                    setConfig(res.data);
                }
                console.log("Fetched all config successfully");
            })
            .catch(err => {
                console.log("Failed to fetch config details");
                console.log(err);
            });

        }
            
    }, [value]);

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
                <Dashboard handleClick={(a, b) => {
                    setConfig(b);
                    setValue(a);
                    setFlag(true);
                }} />
            </TabPanel >
            <TabPanel value={value} index={1}>
                <DisplaySubmission config={config} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <NewPattern config={config} />
            </TabPanel>
        </Box >
    );
}
