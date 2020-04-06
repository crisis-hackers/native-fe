export default class  {
    responses = {};
    stepStack = [];

    constructor(questionnaire) {
        this.stepStack.push(...questionnaire.steps.reverse());
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
        } else if (topItem.negSubsteps && response) {
            substeps = topItem.negSubsteps;
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