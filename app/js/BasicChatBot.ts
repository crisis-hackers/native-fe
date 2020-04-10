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

    getNextStep(response): QStep {
        let topItem = this.stepStack.pop();
        if (response && topItem.key) {
            this.responses[topItem.key] = response.answer;
        }
        let substeps: QStep[] = [];
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

    topItem() : QStep {
        return this.stepStack[this.stepStack.length - 1];
    }

    getResult() : object {
        return this.responses;
    }
}