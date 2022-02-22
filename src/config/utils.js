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