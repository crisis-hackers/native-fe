import {Language} from "@/js/Settings";

export type QMessageTrans = {
    [lang in Language]?: string
}

export type QMessage = {
    text: QMessageTrans,
    title?: QMessageTrans
}

export type QOption = {
    label: QMessageTrans,
    value: number | string | boolean | bigint
}

export enum QType {
    TEXT, NUMBER, BOOLEAN, RADIO, CHECKBOX, DATE
}

export type QStep = {
    key: string,
    messages: QMessage[],
    type: QType | null,
    options?: QOption[],
    nullable?: boolean,
    substeps?: QStep[],
    negSubsteps?: QStep[]
}

export type QInput = {
    type: QType,
    answer: string|string[]|Date,
    options?: []
}

export abstract class AQuestionnaire {
    constants: object;
    steps: QStep[];
}

export class BasicChatBot {
    responses = {};
    stepStack: QStep[] = [];

    constructor(questionnaire: AQuestionnaire) {
        this.stepStack.push(...questionnaire.steps.reverse());
        //dummy for first pop
        this.stepStack.push({key: "", messages: [], type: undefined});
    }

    getNextStep(response: QInput): QStep {
        let topItem = this.stepStack.pop();
        if (response && topItem.key) {
            this.saveResponse(response, topItem);
        }
        let substeps: QStep[] = [];
        if (topItem.substeps && response && response.answer) {
            substeps = this.getPositiveSubsteps(response, topItem);
        } else if (topItem.negSubsteps && response) {
            substeps = topItem.negSubsteps;
        }
        this.stepStack.push(...substeps.reverse());
        if (this.stepStack.length === 0) {
            return null;
        }
        return this.topItem();
    }

    saveResponse(response: QInput, step: QStep) {
        let answer = response.answer;
        switch (step.type) {
            case QType.DATE:
                answer = (answer as Date).getUTCMilliseconds().toString();
        }
        this.responses[step.key] = answer;
    }

    getPositiveSubsteps(response: QInput, step: QStep): QStep[] {
        switch (step.type) {
            case QType.CHECKBOX:
            case QType.RADIO:
                let selected: string[] = typeof response.answer === "string" ? [response.answer as string] : response.answer as string[];
                return step.substeps.filter((substep) => selected.includes(substep.key));
            default:
                return step.substeps ?? [];
        }
    }

    topItem() : QStep {
        return this.stepStack[this.stepStack.length - 1];
    }

    getResult() : object {
        return this.responses;
    }
}