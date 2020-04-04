export default class  {
    steps = [
        {
            key: 'mood',
            title: 'Hello!',
            text: 'How are you?',
            type: 'text'
        },
        {
            key: 'fever_bool',
            text: 'Are you having fever?',
            type: 'boolean',
            substeps: [
                {
                    key: 'fever',
                    text: 'What is your last measured body temperature?',
                    type: 'radio',
                    options: [
                        {
                            label: '37-38',
                            value: 38
                        },
                        {
                            label: '38-38.5',
                            value: 38.5
                        },
                        {
                            label: '38.5-39',
                            value: 39
                        },
                        {
                            label: '39+',
                            value: 40
                        }
                    ]
                }
            ]
        },
        {
            key: 'cough',
            text: 'Do you experience any coughing?',
            type: 'boolean',
            substeps: [
                {

                }
            ]
        }
    ];
    responses = {};
    stepStack = [];

    constructor() {
        this.stepStack.push(...this.steps.reverse());
        //dummy for first pop
        this.stepStack.push({});
    }

    getNextStep(response) {
        let topItem = this.stepStack.pop();
        if (response && topItem.key) {
            this.responses[topItem.key] = response.answer;
        }
        let substeps = [];
        if (topItem.substeps && response && response.answer) {
            substeps = topItem.substeps;
        }
        this.stepStack.push(...substeps.reverse());
        if (this.stepStack.length === 0) {
            return null;
        }
        return this.topItem();
    }

    topItem() {
        return this.stepStack[this.stepStack.length - 1];
    }

    getResult() {
        return this.responses;
    }
}