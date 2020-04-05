<template>
    <Page @loaded="onPageLoaded">
        <ActionBar :title="str.appName">

        </ActionBar>
        <GridLayout rows="*,60" columns="*">
            <ScrollView row="0" col="0" orientation="vertical">
                <FlexboxLayout flexDirection="column" class="msg-feed">
                    <StackLayout v-for="msg in messages" orientation="vertical" :class="msg.question ? 'msg msg-question' : 'msg msg-answer'">
                        <Label v-if="msg.title" class="msg-title">{{ msg.title }}</Label>
                        <Label class="msg-text" :textWrap="true">{{ msg.text }}</Label>
                    </StackLayout>
                    <StackLayout v-if="currentInput !== null" :key="currentInput.type" class="msg msg-answer msg-input">
                        <TextField v-if="currentInput.type === 'text' || currentInput.type === 'number'"
                                   :keyboardType="currentInput.type === 'number' ? 'number' : ''"
                                   v-model="currentInput.answer" returnKeyType="send" @returnPress="processInput" />
                        <StackLayout v-if="currentInput.type === 'boolean' || currentInput.type === 'radio'"
                                     :orientation="currentInput.options && currentInput.options.length > 2 ? 'vertical' : 'horizontal'">
                            <Button class="msg-input-button m-button" v-for="option in currentInput.options" :key="option.value" @tap="processInput(option)">{{ option.label }}</Button>
                        </StackLayout>
                        <StackLayout v-if="currentInput.type === 'checkbox'" orientation="vertical">
                            <StackLayout v-for="option in currentInput.options" :key="option.value" orientation="horizontal">
                                <CheckBox :checked="option.checked" @checkedChange="option.checked = $event.value" />
                                <Label verticalAlignment="center">{{ option.label }}</Label>
                            </StackLayout>
                            <Button class="m-button msg-input-button" @tap="processInput">Hotovo</Button>
                        </StackLayout>
                    </StackLayout>
                </FlexboxLayout>
            </ScrollView>
            <Button row="1" col="0" :isEnabled="currentInput === null && !processing" class="m-button m-green-button" @tap="sendResult">Odoslať</Button>
            <ActivityIndicator rowSpan="2" :busy="processing" />
        </GridLayout>

    </Page>
</template>

<script>
    import BasicChatBot from "../js/BasicChatBot";
    import Strings from './mixins/Strings';
    import BE from '../js/BE';
    import TestResults from './TestResults';
    import Location from '../js/Location';

    export default {
        name: "SelfTest",
        mixins: [
            Strings
        ],
        data() {
            return {
                messages: [],
                currentInput: {},
                chatbot: null,
                processing: false,
                location: null
            }
        },
        methods: {
            processInput(value) {
                switch (this.currentInput.type) {
                    case "text":
                    case "number":
                        this.fillAnswer(this.currentInput.answer);
                        this.addAnswerMessage(this.currentInput.answer);
                        break;

                    case "boolean":
                    case "radio":
                        this.fillAnswer(value.value);
                        this.addAnswerMessage(value.label);
                        break;

                    case "checkbox":
                        let selectedOptions = this.currentInput.options.filter((item) => item.checked);
                        this.fillAnswer(selectedOptions.map((item) => item.value));
                        this.addAnswerMessage(selectedOptions.map((item) => item.label).join(',\n'));
                        break;
                }
                this.nextStep();
            },
            nextStep() {
                let step = this.chatbot.getNextStep(this.currentInput);
                if (step) {
                    step.messages.forEach((msg) => this.addQuestion(msg.text, msg.title));
                    if (!step.type) {
                        //finished
                        this.currentInput = null;
                        return;
                    }
                    if (step.type === 'boolean') {
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
            spawnDummyNextInput() {
                let options = [
                    {
                        label: 'Ajdkljsldkg',
                        value: 5
                    },
                    {
                        label: 'ASkjlkd',
                        value: 552
                    },
                    {
                        label: 'ASkjlkdssfsdjfkdf',
                        value: 552
                    },
                    {
                        label: 'AS',
                        value: 5522
                    },
                    {
                        label: 'ASkj',
                        value: 5521
                    }
                ];
                let rand = Math.random();
                if (rand < 1/5) {
                    this.spawnTextInput();
                } else if (rand < 2/5) {
                    this.spawnBooleanInput();
                } else if (rand < 3/5) {
                    this.spawnRadioInput(options);
                } else if (rand < 4/5) {
                    this.spawnNumberInput();
                } else {
                    this.spawnCheckboxInput(options);
                }
            },
            spawnInput(type, options = null) {
                let answer = '';
                if (type === 'checkbox') {
                    answer = [];
                }
                this.currentInput = {
                    type: type,
                    options: options,
                    answer: answer
                };
            },
            spawnTextInput() {
                this.spawnInput('text');
            },
            spawnBooleanInput() {
                this.spawnInput('boolean', [
                    {
                        label: 'Áno',
                        value: true
                    },
                    {
                        label: 'Nie',
                        value: false
                    }
                ]);
            },
            spawnNumberInput() {
                this.spawnInput('number');
            },
            spawnRadioInput(options) {
                this.spawnInput('radio', options);
            },
            spawnCheckboxInput(options) {
                this.spawnInput('checkbox', options);
            },
            addMessage(question, text, title = null) {
                this.messages = this.messages.concat({
                    question: question,
                    text: text,
                    title: title
                });
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
                this.chatbot = new BasicChatBot();
                this.nextStep();
            },
            getUserLocation() {
                Location.getPreciseLocation(1000 * 30) //30s
                .then((location) => {
                    this.location = location;
                })
                .catch((err) => {
                    console.error(err);
                })
            },
            sendResult() {
                let result = this.chatbot.getResult();
                this.processing = true;
                Promise.resolve()
                .then(() => {
                    //if high precision accuracy was not resolved, resolve just a coarse accuracy with much lower timeout
                    return this.location ? Promise.resolve(this.location) : Location.getCoarseLocation(1000 * 2) //2s
                })
                .then((location) => {
                    result.lat = location.latitude;
                    result.lon = location.longitude;

                    return BE.sendSelfTestResult(result);
                })
                .then((result) => {
                    this.$navigateTo(TestResults);
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
            }
        }
    }
</script>

<style scoped>
    .msg {
        padding: 8dp;
        border-radius: 25px;
        margin-bottom: 8dp;
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
        font-weight: bold;
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