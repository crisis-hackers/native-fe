<template>
    <Page @loaded="onPageLoaded">
        <ActionBar title="Test Results"/>
        <GridLayout rows="*,80" columns="*">
            <FlexboxLayout row="0" flexDirection="column" justifyContent="space-around" alignItems="center"
                padding="64dp" class="result">
                <Label :class="`h2 ${resultClass} title`" :textWrap="true" :text="`testResults.${result.key}.title`|L" />
                <Label class="h3 text1" :textWrap="true" :text="`testResults.${result.key}.text1`|L" />
                <Label class="h3 text2" :textWrap="true" :text="'testResults.thankYou'|L" />
                <Label class="h3 text2" :textWrap="true" :text="'testResults.reminder'|L" />

                <Button class="no-bg-button link-button" @tap="navigateToTest" :text="'testResults.testAgain'|L" />
                <Button class="no-bg-button link-button" @tap="navigateToDashboard" :text="'testResults.dashboard'|L" />
            </FlexboxLayout>
            <CallHelplineButton row="1" />
        </GridLayout>
    </Page>
</template>

<script lang="ts">
    import * as TNSPhone from 'nativescript-phone'
    import Strings from '@/components/mixins/Strings.vue'
    import SelfTest from '@/components/pages/SelfTest.vue';
    import Dashboard from '@/components/pages/Dashboard.vue';
    import CallHelplineButton from '@/components/elements/CallHelplineButton.vue';

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
                        key: 'safe'
                    },
                    risk: {
                        key: 'risk'
                    },
                    danger: {
                        key: 'danger'
                    }
                },
                actualResult: null
            }
        },
        computed: {
            result(): object {
                return this.actualResult ? this.possibleResults[this.actualResult] : {}
            },
            resultClass(): string {
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
                this.$navigateTo(SelfTest, {
                    clearHistory: false
                });
            },
            navigateToDashboard() {
                this.$navigateTo(Dashboard, {
                    clearHistory: true
                });
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