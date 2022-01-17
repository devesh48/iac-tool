export const defaultTemplate = [
    {
        "patternName": "Databricks",
        "templateDetails": [
            {
                "templateName": "Project Information",
                "templateInputDetails": [
                    {
                        "type": "textbox",
                        "name": "gitRepoURL",
                        "label": "Git Repository URL",
                        "required": "yes",
                        "sequenceNo": 1
                    },
                    {
                        "type": "textbox",
                        "name": "lob",
                        "label": "LOB",
                        "required": "yes",
                        "sequenceNo": 1
                    },
                    {
                        "type": "textbox",
                        "name": "owner1",
                        "label": "Owner",
                        "required": "yes",
                        "sequenceNo": 0
                    },
                    {
                        "type": "textbox",
                        "name": "owner2",
                        "label": "Owner",
                        "required": "yes",
                        "sequenceNo": 1
                    },
                    {
                        "type": "textarea",
                        "name": "info",
                        "label": "Info",
                        "sequenceNo": 1
                    },
                    {
                        "type": "select",
                        "name": "account",
                        "label": "Account",
                        "sequenceNo": 1,
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
                "templateName": "AWS Cloud Watch Event Rule",
                "templateInputDetails": [
                    {
                        "type": "textbox",
                        "name": "name",
                        "label": "Name",
                        "required": "yes",
                        "sequenceNo": 1
                    },
                    {
                        "type": "textbox",
                        "name": "description",
                        "label": "Description",
                        "sequenceNo": 1
                    },
                    {
                        "type": "textbox",
                        "name": "eventPattern",
                        "label": "Event Pattern",
                        "required": "yes",
                        "sequenceNo": 1
                    },
                    {
                        "type": "textbox",
                        "name": "gitRepoURL",
                        "label": "Git Repository URL",
                        "required": "yes",
                        "sequenceNo": 1
                    }
                ]
            },
            {
                "templateName": "AWS SFN State Machine",
                "templateInputDetails": [
                    {
                        "type": "textbox",
                        "name": "name",
                        "label": "Name",
                        "required": "yes",
                        "sequenceNo": 1
                    },
                    {
                        "type": "textbox",
                        "name": "roleARN",
                        "label": "Role ARN",
                        "sequenceNo": 1
                    },
                    {
                        "type": "textbox",
                        "name": "eventPattern",
                        "label": "Event Pattern",
                        "required": "yes",
                        "sequenceNo": 1
                    }
                ]
            },
            {
                "templateName": "AWS SNS Topic Subscription",
                "templateInputDetails": [
                    {
                        "type": "textbox",
                        "name": "name",
                        "label": "Name",
                        "required": "yes",
                        "sequenceNo": 1
                    },
                    {
                        "type": "textbox",
                        "name": "protocol",
                        "label": "Protocol",
                        "required": "yes",
                        "sequenceNo": 1
                    },
                    {
                        "type": "textbox",
                        "name": "endPoint",
                        "label": "End Point",
                        "required": "yes",
                        "sequenceNo": 1
                    }
                ]
            }
        ]
    },
    {
        "patternName": "AI/ML",
        "templateDetails": [
        ]
    },
    {
        "patternName": "Website",
        "templateDetails": [
        ]
    },
    {
        "patternName": "Mulesoft",
        "templateDetails": [
        ]
    }
]