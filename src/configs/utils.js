import { defaultTemplate } from './templates/defaultTemplates';

export const fetchFormFieldsForTemplate = (pattern, templateName) => {
    /*
    console.log('In Utils, defaultTemplates size:' + defaultTemplates.length);
    console.log('pattern sent:' + pattern);
    console.log('templateName sent:' + templateName);
    console.log('========');
    */
    let newArray = [];
    if (defaultTemplate && defaultTemplate.length > 0) {
        defaultTemplate.forEach(template => {
            //check if pattern is the same
            /*
            console.log('========');
            console.log('pattern:' + template.patternName);
            console.log('templateName:' + template.templateName);
            */
            if ((template.patternName === pattern) && template.templateName === templateName) {
                newArray = template.templateDetails;
            }
        });
        return newArray;
    } else {
        return newArray;
    }
}

export const getTemplatesForPattern = (pattern) => {
    let newArray = [];
    if (defaultTemplate && defaultTemplate.length > 0) {
        defaultTemplate.forEach(obj => {
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

export const getInitialValue = (pattern, temp) => {
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
            field.value = '';
            objOrig.templateInputDetails.push(field);
        });
        initObj.templateDetails.push(objOrig);
    });
    return initObj;

}

