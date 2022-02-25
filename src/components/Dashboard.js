import * as React from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import DashBoardTable from './DashBoardTable';

function DashBoard() {

    const [pipeLineDetails, setPipeLineDetails] = React.useState([]);

    React.useEffect(() => {
        axios.get('https://iac-tool.herokuapp.com/getAllPipelines')
            .then(res => {
                if (res.data.length > 0) {
                    console.log("Fetched /getAllPipelines details");
                    let projectPipeLinesData = [];
                    let tempPipeLineData = res.data;
                    tempPipeLineData.forEach(pipeline => {
                        let tmpData = {
                            patternName: pipeline['patternName'],
                            _id: pipeline['_id'],
                            gitURL: pipeline['gitURL']
                        };
                        projectPipeLinesData.push(tmpData);
                    });
                    setPipeLineDetails(projectPipeLinesData);
                }
            })
            .catch(err => {
                console.log("Failed to fetch /getAllPipelines details");
                console.log(err);
            });
    }, []);

    return (
        <React.Fragment>
            <Typography variant="subtitle1" align="left" color="primary" sx={{ mb: 2 }}>
                PIPELINES LIST
            </Typography>
            <DashBoardTable pipeLineDetails={pipeLineDetails} />
        </React.Fragment>
    );
}

export default DashBoard;