export const addFieldTypes = [
    'Text Box',
    'Text Area',
    'Drop Down'
]


export const awsTypes = [
    'Foundation',
    'Infrastructure'
]

export const managePatternOptions = [
    'Create a nonexistent pattern',
    'Edit Pattern'
]

export const defaultStepsToAddPattern = [
    'General',
    'Add Meta Data',
    'Add JSON template'
]

export const defaultStepsToAddSubmission = [
    'General',
    'Fill Form',
    'Project Information'
]

export const toolTipsDetailsJSON = [
    {
        "sequenceNo": 0,
        "title": "Pattern Name to be saved. Example: Databricks, MuleSoft",
        "placement": "right"
    },
    {
        "sequenceNo": 1,
        "title": "Subforms are different sections or sub parts of a pattern. You can have multiple subforms by givings their value in csv format. Example: Project Information, General Information",
        "placement": "right"
    },
    {
        "sequenceNo": 2,
        "title": "Field Label to be displayed while creating pipelines",
        "placement": "bottom"
    },
    {
        "sequenceNo": 3,
        "title": "Field values to be selected from. Add multiple values in CSV format",
        "placement": "bottom"
    },
    {
        "sequenceNo": 4,
        "title": "Delete Field",
        "placement": "bottom"
    },
    {
        "sequenceNo": 5,
        "title": "While submitting the JSON Template, you must remember to use {{field name}} annotation to add dynamic fields. They must go as string. If JSON template submitted is improper, pipeline will not be triggerred.",
        "placement": "right"
    },
    {
        "sequenceNo": 6,
        "title": "Provide a valid GitHub URL. It can be given without the prefix of HTTP protocol also. Example: github.com/acc-github-repo/iac-auto-commit",
        "placement": "right"
    },
    {
        "sequenceNo": 7,
        "title": "Provide a valid GitHub User Token.",
        "placement": "right"
    },
    {
        "sequenceNo": 8,
        "title": "Submit. A new pipeline is triggered.",
        "placement": "bottom"
    },
    {
        "sequenceNo": 9,
        "title": "Save for later. Pipeline is not triggered",
        "placement": "bottom"
    },
    {
        "sequenceNo": 10,
        "title": "Edit",
        "placement": "bottom-end"
    },
    {
        "sequenceNo": 11,
        "title": "Retry",
        "placement": "right-end"
    },
    {
        "sequenceNo": 12,
        "title": "Provide a name for Git Repository to be created",
        "placement": "right"
    },
]

const pipeLineStatus = [
    'FINISHED',
    'PENDING',
    'FAILED',
    'CANCELED',
    'RUNNING'
]