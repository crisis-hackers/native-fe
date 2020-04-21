<template>
    <Page>
        <MActionBar title="Test Results"/>
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
    import Strings from '@/components/mixins/Strings.vue'
    import SelfTest from '@/components/pages/SelfTest.vue';
    import Dashboard from '@/components/pages/Dashboard.vue';
    import CallHelplineButton from '@/components/elements/CallHelplineButton.vue';
    import {SelfTestResult} from "@/js/BE";
    import MActionBar from "@/components/elements/MActionBar.vue";

    export default {
        name: "TestResults",
        components: {MActionBar, CallHelplineButton},
        mixins: [
            Strings
        ],
        props: {
            beResult: {
                type: Number as () => SelfTestResult
            }
        },
        data() {
            return {
                possibleResults: {
                    1: {
                        key: 'safe'
                    },
                    2: {
                        key: 'risk'
                    },
                    3: {
                        key: 'danger'
                    }
                }
            }
        },
        computed: {
            result(): object {
                return this.actualResult ? this.possibleResults[this.beResult] : {}
            },
            resultClass(): string {
                return this.actualResult ?? '';
            }
        },
        methods: {
            navigateToTest() {
                this.$navigateTo(SelfTest, {
                    clearHistory: false
                });
            },
            navigateToDashboard() {
                this.$navigateTo(Dashboard, {
                    clearHistory: true
                });
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