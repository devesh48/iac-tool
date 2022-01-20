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

export const insertToArray = (arr, index, newItem) => [
    ...arr.slice(0, index), newItem, ...arr.slice(index)
]
export const getTemplatesForPattern = (config, pattern) => {
    let newArray = [];
    if (config && config.length > 0) {
        config.forEach(obj => {
            //check if pattern is the same
            if ((obj.patternName === pattern)) {
                newArray = obj.templateDetails;
            }
        });
        return newArray;
    } else {
        return newArray;
    }
}

export const getInitialFormValue = (pattern, temp) => {
    let initObj = {
        patternName: pattern,
        templateDetails: []
    };

    temp.forEach(subForm => {
        let objOrig = {
            templateName: subForm.templateName,
            templateInputDetails: []
        };

        let inputDetails = subForm.templateInputDetails;
        inputDetails.forEach(field => {
            // field.value = ;
            objOrig.templateInputDetails.push(field);
        });
        initObj.templateDetails.push(objOrig);
    });
    return initObj;
}

export const getInitialFormValueWithPreLoading = (pattern, temp) => {
    let initObj = {
        patternName: pattern,
        templateDetails: []
    };

    temp.forEach(subForm => {
        let objOrig = {
            templateName: subForm.templateName,
            templateInputDetails: []
        };

        let inputDetails = subForm.templateInputDetails;
        inputDetails.forEach(field => {
            field.value = field.label;
            objOrig.templateInputDetails.push(field);
        });
        initObj.templateDetails.push(objOrig);
    });
    return initObj;
}

export const getInitialFormValueWithoutPreLoading = () => {
    let initObj = {
        patternName: "",
        templateDetails: []
    };

    let initTempObj = {
        templateName: "",
        templateInputDetails: []
    }
    initObj.templateDetails.push(initTempObj);
    return initObj;
}

export const getDefaultPatterns = (config) => {
    let newArray = [];
    if (config && config.length > 0) {
        config.forEach(obj => {
            newArray.push(obj.patternName);
        });
        return newArray;
    } else {
        return newArray;
    }
}

