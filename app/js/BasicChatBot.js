export default class  {
    position = 0;
    steps = [
        {
            title: 'Hello!',
            text: 'How are you?',
            type: 'text'
        },
        {
            text: 'Are you having fever?',
            type: 'boolean'
        },
        {
            text: 'Do you experience any coughing?',
            type: 'boolean'
        }
    ];

    getNextStep(response) {
        if (this.position > this.steps.length) {
            return null;
        }
        return this.steps[this.position++];
    }

    getResult() {

    }
}