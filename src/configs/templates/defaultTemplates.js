export const defaultTemplates = [
    {
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
                "type": "textarea",
                "name": "info",
                "label": "Info"
            },
            {
                "type": "select",
                "name": "account",
                "label": "Account",
                "values": [
                    {
                        "value": "DA1"
                    },
                    {
                        "value": "DA2"
                    },
                    {
                        "value": "Ingest"
                    },
                    {
                        "value": "Analytics"
                    }
                ]
            },
            {
                "type": "select",
                "name": "dataClass",
                "label": "Data Classification",
                "values": [
                    {
                        "value": "Internal"
                    },
                    {
                        "value": "Confidential"
                    },
                    {
                        "value": "Public"
                    }
                ]
            }
        ]
    },
    {
        "patternName": "Databricks",
        "templateName": "AWS Cloud Watch Event Rule",
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
    },
    {
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
                "name": "roleARN",
                "label": "Role ARN"
            },
            {
                "type": "textbox",
                "name": "eventPattern",
                "label": "Event Pattern",
                "required": "yes"
            }
        ]
    },
    {
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
]