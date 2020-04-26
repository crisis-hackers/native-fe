<template>
    <Page @loaded="onPageLoaded">
        <MActionBar :title="str.appName" :show-back-button="true" :img-res-svg="'coronavirus'|svg"
                    :action-items="[{icon: 'res://group', event:'reload'}]" @reload="reload"/>
        <GridLayout rows="*" columns="*">
            <GridLayout rows="*,60" columns="*" :class="`${processing ? 'loading-disabled' : ''}`">
                <ScrollView row="0" col="0" orientation="vertical" ref="mainScrollView">
                    <FlexboxLayout flexDirection="column" class="msg-feed">
                        <StackLayout v-for="msg in messages" orientation="vertical" :class="msg.question ? 'msg font-poppins-reg msg-question' : 'msg msg-answer'">
                            <Label v-if="msg.title" class="msg-title">{{ msg.title }}</Label>
                            <Label class="msg-text" :textWrap="true">{{ msg.text }}</Label>
                        </StackLayout>
                        <StackLayout v-if="currentInput !== null" :key="currentInput.type" :class="inputLayoutClass">
                            <TextField v-if="currentInput.type === QType.TEXT || currentInput.type === QType.NUMBER"
                                       :keyboardType="currentInput.type === QType.NUMBER ? 'number' : ''"
                                       v-model="currentInput.answer" returnKeyType="send" @returnPress="processInput" ref="inputTextField" />
                            <FlexboxLayout v-if="currentInput.type === QType.BOOLEAN || currentInput.type === QType.RADIO || currentInput.type === QType.CHECKBOX"
                                           class="msg-buttons-layout">
                                <Button v-for="option in currentInput.options" :key="option.value"
                                        :class="`msg-input-button${selectedOptions[option.value] ? '-active' : ''}`"
                                        @tap="processInput(option)" :text="tq(option.label)" />
                                <SVGImage v-if="currentInput.type === QType.CHECKBOX" class="msg-input-checkbox-button"
                                          :src="'questionnaire_next_btn'|svg" @tap="processInput(undefined)" />
                            </FlexboxLayout>
                            <StackLayout v-if="currentInput.type === QType.DATE">
                                <DatePicker v-model="currentInput.answer" :minDate="datePicker.min" :maxDate="datePicker.max" />
                                <Button class="m-button msg-input-button" @tap="processInput" :text="'buttons.done'|L" />
                            </StackLayout>
                        </StackLayout>
                    </FlexboxLayout>
                </ScrollView>
                <Button row="1" col="0" :isEnabled="currentInput === null && !processing" class="m-button m-green-button" @tap="sendResult" :text="'buttons.send'|L" />
            </GridLayout>
            <ActivityIndicator rowSpan="1" :busy="processing" />
        </GridLayout>
    </Page>
</template>

<script lang="ts">
    import {BasicChatBot, QInput, QMessage, QMessageTrans, QStep, QType} from "@/js/BasicChatBot";
    import Strings from '../mixins/Strings.vue';
    import BE, {SelfTestResult} from '../../js/BE';
    import TestResults from './TestResults.vue';
    import LocationHelper from '../../js/Location';
    import MActionBar from "@/components/elements/MActionBar.vue";
    import {Questionnaire} from "@/js/Questionnaire";
    import {Location as MLocation, Settings} from '@/js/Settings';
    import {Location as NSLocation} from 'nativescript-geolocation'
    import {formatDate} from "@/js/utils/Format";
    import {AxiosResponse} from "axios";

    export default {
        name: "SelfTest",
        components: {MActionBar},
        mixins: [
            Strings
        ],
        data() {
            return {
                QType,
                messages: [],
                currentInput: {} as QInput,
                chatbot: null as BasicChatBot,
                processing: false,
                location: null,
                scrollLock: false,
                language: Settings.getLanguageToUse(),
                datePicker: {
                    min: new Date(2019, 11, 1), //first case
                    max: new Date(),
                },
                selectedOptions: {}
            }
        },
        computed: {
            inputLayoutClass() {
                if (!this.currentInput) {
                    return '';
                }
                let ret = 'msg msg-input font-poppins-reg';
                switch (this.currentInput.type) {
                    case QType.DATE:
                        ret += ' msg-answer'
                        break;
                    case QType.NUMBER:
                        ret += ' msg-answer';
                        break;
                    case QType.TEXT:
                        ret += ' msg-answer';
                        break;
                }
                return ret;
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
                        if(value) {
                            this.$set(this.selectedOptions, value.value, !this.selectedOptions[value.value]);
                            return;
                        } else {
                            let selectedOptions = this.currentInput.options.filter(item => this.selectedOptions[item.value] && true);
                            this.fillAnswer(selectedOptions.map((item) => item.value));
                            this.addAnswerMessage(selectedOptions.map((item) => this.tq(item.label)).join(',\n'));
                            this.selectedOptions = {};
                        }
                        break;

                    case QType.DATE:
                        this.fillAnswer(this.currentInput.answer);
                        this.addAnswerMessage(formatDate(this.currentInput.answer as Date))
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
                let answer: string|string[]|Date = '';
                switch (type) {
                    case QType.CHECKBOX:
                        answer = [];
                        break;
                    case QType.DATE:
                        answer = new Date();
                        break;
                }
                this.currentInput = {
                    type: type,
                    options: options,
                    answer: answer
                } as QInput;
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
                this.selectedOptions = {};
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
                .then((result: AxiosResponse<SelfTestResult>) => {
                    this.$navigateTo(TestResults, {
                        clearHistory: true,
                        props: {
                            result: result.data
                        }
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
            },
            reload() {
                this.onPageLoaded();
            }
        }
    }
</script>

<style scoped lang="scss">
    .msg {
        padding: 8dp 12dp;
        border-radius: 25px;
        margin-top: 8dp;
        margin-bottom: 0dp;
        font-size: 14sp;
    }

    .msg-question {
        align-self: flex-start;
        background-color: #bae8f5;
        margin-right: 20%;
    }

    .msg-answer {
        align-self: flex-end;
        background-color: #20a7c7;
        color: white;
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
        border-radius: 50%;
        background-color: #f0f0f0;
        color: black;
        $x-padding: 8dp;
        $y-padding: 0dp;
        padding: $y-padding $x-padding;

        $x-margin: 4dp;
        margin-left: $x-margin;
        margin-right: $x-margin;

        &-active {
            @extend .msg-input-button;
            background-image: linear-gradient(120deg, #005395 8%, #31456a 178%);
            color: white;
        }
    }

    .msg-buttons-layout {
        flex-direction: row;
        flex-wrap: wrap;
    }

    .msg-input-checkbox-button {
        $size: 48dp;
        height: $size;
        width: $size;
        vertical-align: center;
    }

    .msg TextField {
        color: white;
        background-color: #20a7c7;
        border-color: white;
        border-width: 0;
        border-bottom-width: 1;
    }
</style>