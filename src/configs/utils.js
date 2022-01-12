import {
    projectInfoTemplate,
    cloudWatchTemplate,
    stateMachineTemplate,
    snsTopicTemplate
} from './templates/SampleTemplates';

export const fetchJSON = (templateName) => {
    //console.log('In utils, templateName:' + templateName);
    if (templateName === 'Project Information') {
        return projectInfoTemplate;
    } else if (templateName === 'AWS Cloud Watch Event Rule') {
        return cloudWatchTemplate;
    } else if (templateName === 'AWS SFN State Machine') {
        return stateMachineTemplate;
    } else if (templateName === 'AWS SNS Topic Subscription') {
        return snsTopicTemplate;
    } else {
        return '';
    }
}