<template>
    <Page ref="page">
        <ActionBar :title="`${str.appName}`">

        </ActionBar>
        <GridLayout columns="*" rows="*,*,*" class="main">
            <Button row="0" class="m-button m-green-button" @tap="startTest">Start test</Button>
            <SocialShareButton row="1" />
            <CallHelplineButton row="2" />
        </GridLayout>
    </Page>
</template>

<script>
    import SelfTest from './SelfTest';
    import SendTest from './SendTest';
    import Strings from './mixins/Strings'
    import TestResults from './TestResults';
    import CallHelplineButton from "@/components/CallHelplineButton";
    import SocialShareButton from "@/components/SocialShareButton";

    export default {
        components: {SocialShareButton, CallHelplineButton},
        mixins:[
            Strings
        ],
        data() {
              return {
                    msg: 'Hello World!'
              }
        },
        methods: {
            startTest() {
                this.$navigateTo(SelfTest);
            },
            dummySendTest() {
                this.$navigateTo(SendTest)
            },
            dummyTestResult() {
                this.$navigateTo(TestResults);
            }
        }
    }
</script>

<style scoped>
    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }

    .main {
        padding-left: 16dp;
        padding-right: 16dp;
    }
</style>
