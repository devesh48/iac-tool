import { toolTipsDetailsJSON } from './constants';

export const getInputType = (label) => {
    let inputType = '';
    if (label === 'Text Box')
        inputType = 'textbox';
    else if (label === 'Text Area')
        inputType = 'textarea';
    else if (label === 'Drop Down')
        inputType = 'select';
    return inputType;
}


export const getToolTipTitle = (sequenceNo) => {
    let reqObj = toolTipsDetailsJSON[sequenceNo];
    return reqObj['title'];
}

export const getToolTipPlacement = (sequenceNo) => {
    let reqObj = toolTipsDetailsJSON[sequenceNo];
    return reqObj['placement'];
}