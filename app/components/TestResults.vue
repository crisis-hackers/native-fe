<template>
    <Page @loaded="onPageLoaded">
        <ActionBar title="Test Results"/>
        <GridLayout rows="*,80" columns="*">
            <FlexboxLayout row="0" flexDirection="column" justifyContent="space-around" alignItems="center"
                padding="64dp" class="result">
                <Label :class="`h2 ${resultClass} title`" :textWrap="true">{{ result.title }}</Label>
                <Label class="h3 text1" :textWrap="true">{{ result.text1 }}</Label>
                <Label class="h3 text2" :textWrap="true">Thank you for your time.</Label>
                <Label class="h3 text2" :textWrap="true">Please check the app regularly to stay updated.</Label>

                <Button class="no-bg-button link-button" @tap="navigateToTest">Test again</Button>
                <Button class="no-bg-button link-button" @tap="navigateToDashboard">Track your neighbourhood</Button>
            </FlexboxLayout>
            <CallHelplineButton row="1" />
        </GridLayout>
    </Page>
</template>

<script>
    import * as TNSPhone from 'nativescript-phone'
    import Strings from './mixins/Strings'
    import SelfTest from './SelfTest';
    import Dashboard from './Dashboard';
    import CallHelplineButton from "@/components/CallHelplineButton";

    export default {
        name: "TestResults",
        components: {CallHelplineButton},
        mixins: [
            Strings
        ],
        data() {
            return {
                possibleResults: {
                    safe: {
                        title: 'You are safe!',
                        text1: 'Stay home and help prevent the spread of COVID-19'
                    },
                    risk: {
                        title: 'You are at high risk!',
                        text1: 'Isolate yourself and your immediate family members'
                    },
                    danger: {
                        title: 'Get yourself tested now!',
                        text1: 'Isolate yourself and your immediate family members'
                    }
                },
                actualResult: null
            }
        },
        computed: {
            result() {
                return this.actualResult ? this.possibleResults[this.actualResult] : {}
            },
            resultClass() {
                return this.actualResult ?? '';
            }
        },
        methods: {
            dummyGetResult() {
                let keys = Object.keys(this.possibleResults);
                this.actualResult = keys[Math.floor(Math.random() * keys.length)];
            },
            callHelpLine() {
                console.dir(this.result);
                TNSPhone.dial(this.num.helpline, true);
            },
            navigateToTest() {
                this.$navigateTo(SelfTest);
            },
            navigateToDashboard() {
                this.$navigateTo(Dashboard);
            },
            onPageLoaded() {
                this.dummyGetResult();
            }
        }
    }
</script>

<style scoped>
    .result {
        text-align: center;
    }

    .no-bg-button {
        border-width: 0px;
        android-elevation: 0;
        text-transform: uppercase;
    }

    .link-button {
        font-weight: bold;
        text-decoration: underline;
    }

    .title {
        text-transform: uppercase;
        font-weight: bold;
    }

    .safe {
        color: #53c1ec;
    }

    .risk {
        color: #f8b74b;
    }

    .danger {
        color: #f1533d;
    }
</style>