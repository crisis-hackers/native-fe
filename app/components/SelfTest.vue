<template>
    <Page>
        <ActionBar title="Quarantina" />
        <ScrollView orientation="vertical">
            <FlexboxLayout flexDirection="column" class="msg-feed">
                <StackLayout v-for="msg in messages" orientation="vertical" :class="msg.question ? 'msg msg-question' : 'msg msg-answer'">
                    <Label v-if="msg.title" class="msg-title">{{ msg.title }}</Label>
                    <Label class="msg-text" :textWrap="true">{{ msg.text }}</Label>
                </StackLayout>
                <StackLayout v-if="currentInput" :key="currentInput.type" class="msg msg-answer msg-input">
                    <TextField v-if="currentInput.type === 'text' || currentInput.type === 'number'"
                               :keyboardType="currentInput.type === 'number' ? 'number' : ''"
                               v-model="currentInput.answer" returnKeyType="send" @returnPress="processInput" />
                    <StackLayout v-if="currentInput.type === 'boolean' || currentInput.type === 'radio'"
                                 :orientation="currentInput.options.length > 2 ? 'vertical' : 'horizontal'">
                        <Button class="msg-input-button" v-for="option in currentInput.options" @tap="processInput(option)">{{ option.label }}</Button>
                    </StackLayout>
                </StackLayout>
            </FlexboxLayout>
        </ScrollView>
    </Page>
</template>

<script>
    export default {
        name: "SelfTest",
        data() {
            return {
                messages: [
                    {
                        question: true,
                        title: 'sdsdgfgdfg',
                        text: 'SSDahskjhaskjdhaskjh kjhfjkasdhf kjashdg hsdakjgh sdkjghfk jsdhfkjshdfkjdshk fsdkjf hkjdshf ksdhfk hdkjf'
                    },
                    {
                        question: true,
                        title: 'sdsdf',
                        text: 'ahskjhs'
                    },
                    {
                        question: false,
                        text: 'ahskjh'
                    }
                ],
                currentInput: {
                    type: 'number'
                }
            }
        },
        methods: {
            processInput(value) {
                switch (this.currentInput.type) {
                    case "text":
                    case "number":
                        this.addAnswer(this.currentInput.answer);
                        break;

                    case "boolean":
                    case "radio":
                        this.addAnswer(value.label);
                        break;
                }
                this.currentInput = null;
                this.nextStep();
            },
            nextStep() {
                this.addQuestion('Test?');
                this.spawnRadioInput([
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
                ]);
            },
            spawnInput(type, options = null) {
                this.currentInput = {
                    type: type,
                    options: options,
                    answer: '',
                    answerArray: []
                };
            },
            spawnTextInput() {
                this.spawnInput('text');
            },
            spawnBooleanInput() {
                this.spawnInput('boolean', [
                    {
                        label: 'Yes',
                        value: true
                    },
                    {
                        label: 'No',
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
                console.log('jkjdsd');
                console.log(this.messages.length);
                this.messages = this.messages.concat({
                    question: question,
                    text: text,
                    title: title
                });
                console.log(this.messages.length);
            },
            addQuestion(text, title = null) {
                this.addMessage(true, text, title);
            },
            addAnswer(text) {
                this.addMessage(false, text);
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
        background-color: lightgoldenrodyellow;
        margin-right: 20%;
    }

    .msg-answer {
        align-self: flex-end;
        background-color: lightblue;
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
        margin: 0dp;
    }

    .msg-input {
        width: 60%;
    }

    .msg-input-button {

    }
</style>