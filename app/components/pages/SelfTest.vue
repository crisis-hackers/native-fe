<template>
    <Page @loaded="onPageLoaded">
        <ActionBarBackButton :title="str.appName" />
        <GridLayout rows="*,60" columns="*">
            <ScrollView row="0" col="0" orientation="vertical" ref="mainScrollView">
                <FlexboxLayout flexDirection="column" class="msg-feed">
                    <StackLayout v-for="msg in messages" orientation="vertical" :class="msg.question ? 'msg msg-question' : 'msg msg-answer'">
                        <Label v-if="msg.title" class="msg-title">{{ msg.title }}</Label>
                        <Label class="msg-text" :textWrap="true">{{ msg.text }}</Label>
                    </StackLayout>
                    <StackLayout v-if="currentInput !== null" :key="currentInput.type" class="msg msg-answer msg-input">
                        <TextField v-if="currentInput.type === QType.TEXT || currentInput.type === QType.NUMBER"
                                   :keyboardType="currentInput.type === QType.NUMBER ? 'number' : ''"
                                   v-model="currentInput.answer" returnKeyType="send" @returnPress="processInput" ref="inputTextField" />
                        <StackLayout v-if="currentInput.type === QType.BOOLEAN || currentInput.type === QType.RADIO"
                                     :orientation="currentInput.options && currentInput.options.length > 2 ? 'vertical' : 'horizontal'">
                            <Button class="msg-input-button m-button" v-for="option in currentInput.options" :key="option.value" @tap="processInput(option)">{{ tq(option.label) }}</Button>
                        </StackLayout>
                        <StackLayout v-if="currentInput.type === QType.CHECKBOX" orientation="vertical">
                            <StackLayout v-for="option in currentInput.options" :key="option.value" orientation="horizontal">
                                <CheckBox :checked="option.checked" @checkedChange="option.checked = $event.value" />
                                <Label verticalAlignment="center">{{ tq(option.label) }}</Label>
                            </StackLayout>
                            <Button class="m-button msg-input-button" @tap="processInput">Hotovo</Button>
                        </StackLayout>
                    </StackLayout>
                </FlexboxLayout>
            </ScrollView>
            <Button row="1" col="0" :isEnabled="currentInput === null && !processing" class="m-button m-green-button" @tap="sendResult" :text="'buttons.send'|L" />
            <ActivityIndicator rowSpan="2" :busy="processing" />
        </GridLayout>

    </Page>
</template>

<script lang="ts">
    import {BasicChatBot, QMessage, QMessageTrans, QStep, QType} from "@/js/BasicChatBot";
    import Strings from '../mixins/Strings.vue';
    import BE from '../../js/BE';
    import TestResults from './TestResults.vue';
    import LocationHelper from '../../js/Location';
    import ActionBarBackButton from "@/components/elements/ActionBarBackButton.vue";
    import {Questionnaire} from "@/js/Questionnaire";
    import {Location as MLocation, Settings} from '@/js/Settings';
    import {Location as NSLocation} from 'nativescript-geolocation'

    export default {
        name: "SelfTest",
        components: {ActionBarBackButton},
        mixins: [
            Strings
        ],
        data() {
            return {
                QType,
                messages: [],
                currentInput: {},
                chatbot: null as BasicChatBot,
                processing: false,
                location: null,
                scrollLock: false,
                language: Settings.getLanguageToUse()
            }
        },
        methods: {
            processInput(value) {
                switch (this.currentInput.type) {
                    case QType.TEXT:
                    case QType.NUMBER:
                        this.fillAnswer(this.currentInput.answer);
                        this.addAnswerMessage(this.currentInput.answer);
                        break;

                    case QType.BOOLEAN:
                    case QType.RADIO:
                        this.fillAnswer(value.value);
                        this.addAnswerMessage(this.tq(value.label));
                        break;

                    case QType.CHECKBOX:
                        let selectedOptions = this.currentInput.options.filter((item) => item.checked);
                        this.fillAnswer(selectedOptions.map((item) => item.value));
                        this.addAnswerMessage(selectedOptions.map((item) => this.tq(item.label)).join(',\n'));
                        break;
                }
                this.nextStep();
            },
            nextStep() {
                let step = this.chatbot.getNextStep(this.currentInput) as QStep;
                if (step) {
                    step.messages.forEach((msg: QMessage) => this.addQuestion(this.tq(msg.text), this.tq(msg.title)));
                    if (step.type === null) {
                        //finished
                        this.currentInput = null;
                        return;
                    }
                    if (step.type === QType.BOOLEAN) {
                        this.spawnBooleanInput();
                    } else {
                        this.spawnInput(step.type, step.options);
                    }
                    return;
                }
                //finished
                this.currentInput = null;
            },
            fillAnswer(value) {
                this.currentInput.answer = value;
            },
            spawnInput(type: QType, options = null) {
                let answer: string|string[] = '';
                if (type === QType.CHECKBOX) {
                    answer = [];
                }
                this.currentInput = {
                    type: type,
                    options: options,
                    answer: answer
                };
                if (type === QType.TEXT || type === QType.NUMBER) {
                    this.requestTextFieldFocus();
                }
            },
            spawnTextInput() {
                this.spawnInput(QType.TEXT);
            },
            spawnBooleanInput() {
                this.spawnInput(QType.BOOLEAN, [
                    {
                        label: {
                            sk: 'Áno',
                            en: 'Yes'
                        },
                        value: true
                    },
                    {
                        label: {
                            sk: 'Nie',
                            en: 'No'
                        },
                        value: false
                    }
                ]);
            },
            spawnNumberInput() {
                this.spawnInput(QType.NUMBER);
            },
            spawnRadioInput(options) {
                this.spawnInput(QType.RADIO, options);
            },
            spawnCheckboxInput(options) {
                this.spawnInput(QType.CHECKBOX, options);
            },
            addMessage(question, text, title = null) {
                this.messages = this.messages.concat({
                    question: question,
                    text: text,
                    title: title
                });
                this.scrollToBottom();
            },
            addQuestion(text, title = null) {
                this.addMessage(true, text, title);
            },
            addAnswerMessage(text) {
                this.addMessage(false, text);
            },
            onPageLoaded() {
                this.messages = [];
                this.getUserLocation();
                this.chatbot = new BasicChatBot(new Questionnaire());
                this.nextStep();
            },
            getUserLocation() {
                LocationHelper.getPreciseLocation(1000 * 30) //30s
                .then((location: NSLocation) => {
                    this.location = location;
                })
                .catch((err: any) => {
                    console.error(err);
                })
            },
            sendResult() {
                let result = this.chatbot.getResult();
                this.processing = true;
                Promise.resolve()
                .then(() => {
                    //if high precision accuracy was not resolved, resolve just a coarse accuracy with much lower timeout
                    return this.location ? Promise.resolve(this.location) : LocationHelper.getCoarseLocation(1000 * 2) //2s
                })
                .then((location: NSLocation|MLocation) => {
                    result.lat = location.latitude;
                    result.lon = location.longitude;

                    return BE.sendSelfTestResult(result);
                })
                .then((result) => {
                    this.$navigateTo(TestResults, {
                        clearHistory: true
                    });
                })
                .catch((err) => {
                    console.log(err);
                    if (err.response) {
                        if (err.response.status) {
                            // server error
                            //TODO
                            console.dir(err.response);
                        } else {
                            // network error
                            //TODO
                        }
                    }
                })
                .finally(() => {
                    this.processing = false;
                })
            },
            scrollToBottom() {
                if (this.scollLock) {
                    return;
                }
                let sv = this.$refs.mainScrollView.nativeView;
                this.scollLock = true;
                setTimeout(() => {
                    sv.scrollToVerticalOffset(sv.scrollableHeight, true);
                    this.scollLock = false;
                }, 50);
            },
            requestTextFieldFocus() {
                setTimeout(() => {
                    let tf = this.$refs.inputTextField.nativeView;
                    console.log(tf);
                    tf.focus();
                }, 200);
            },
            //translate questionnaire entries
            tq(value: QMessageTrans) {
                if (!value) {
                    return null;
                }
                return value[this.language];
            }
        }
    }
</script>

<style scoped>
    .msg {
        padding: 8dp 12dp;
        border-radius: 25px;
        margin-bottom: 8dp;
        font-size: 14sp;
    }

    .msg-question {
        align-self: flex-start;
        background-color: #ffeaa7;
        margin-right: 20%;
    }

    .msg-answer {
        align-self: flex-end;
        background-color: #c2e1e7;
        margin-left: 20%;
    }

    .msg-answer .msg-text {

    }

    .msg-title {
        font-weight: bold;
    }

    .msg-text {

    }

    .msg-feed {
        padding: 16dp;
    }

    .msg-input {
        width: 60%;
    }

    .msg-input-button {
        font-size: 12px;
    }
</style>