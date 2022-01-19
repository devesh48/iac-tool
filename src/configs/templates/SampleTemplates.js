export const projectInfoTemplate = {
    "patternName": "Databricks",
    "templateName": "Project Information",
    "templateDetails": [
        {
            "type": "textbox",
            "name": "gitRepoURL",
            "label": "Git Repository URL",
            "required": "yes"
        },
        {
            "type": "textbox",
            "name": "lob",
            "label": "LOB",
            "required": "yes"
        },
        {
            "type": "textbox",
            "name": "owner1",
            "label": "Owner 1",
            "required": "yes"
        },
        {
            "type": "textbox",
            "name": "owner2",
            "label": "Owner 2"
        },
        {
            "type": "textbox",
            "name": "info",
            "label": "Info"
        }
    ]
}

export const cloudWatchTemplate = {
    "patternName": "Databricks",
    "templateName": "AWS Cloud Eatch Event Rule",
    "templateDetails": [
        {
            "type": "textbox",
            "name": "name",
            "label": "Name",
            "required": "yes"
        },
        {
            "type": "textbox",
            "name": "description",
            "label": "Description"
        },
        {
            "type": "textbox",
            "name": "eventPattern",
            "label": "Event Pattern",
            "required": "yes"
        }
    ]
}

export const stateMachineTemplate = {
    "patternName": "Databricks",
    "templateName": "AWS SFN State Machine",
    "templateDetails": [
        {
            "type": "textbox",
            "name": "name",
            "label": "Name",
            "required": "yes"
        },
        {
            "type": "textbox",
            "name": "description",
            "label": "Description"
        },
        {
            "type": "textbox",
            "name": "eventPattern",
            "label": "Event Pattern",
            "required": "yes"
        }
    ]
}

export const snsTopicTemplate = {
    "patternName": "Databricks",
    "templateName": "AWS SNS Topic Subscription",
    "templateDetails": [
        {
            "type": "textbox",
            "name": "name",
            "label": "Name",
            "required": "yes"
        },
        {
            "type": "textbox",
            "name": "protocol",
            "label": "Protocol",
            "required": "yes"
        },
        {
            "type": "textbox",
            "name": "endPoint",
            "label": "End Point",
            "required": "yes"
        }
    ]
}