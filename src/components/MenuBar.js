import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import DashBoard from './Dashboard';
import NewPattern from './pattern/NewPattern';
import NewPipeline from './pipeline/NewPipeline';

function LinkTab(props) {
    return (
        <Tab
            component="a"
            onClick={(event) => {
                event.preventDefault();
            }}
            {...props}
        />
    );
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return <React.Fragment {...other}>{value === index && <Box p={3}>{children}</Box>}</React.Fragment>;
}

export default function MenuBar() {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <React.Fragment>
            <Box sx={{ width: '100%' }}>
                <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
                    <LinkTab label="Dashboard" href="/" />
                    <LinkTab label="Create a new Pipeline" href="/createNewPipeline" />
                    <LinkTab label="Manage Patterns" href="/managePattern" />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <DashBoard />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <NewPipeline />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <NewPattern />
                </TabPanel>
            </Box>
        </React.Fragment>
    );
}
