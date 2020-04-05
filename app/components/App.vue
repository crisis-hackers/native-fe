<template>
    <Page>
        <ActionBar :title="`${str.appName}`">

        </ActionBar>
        <GridLayout columns="*" rows="*,*,*,*" class="main">
            <Button row="0" class="m-button m-green-button" @tap="startTest">Start test</Button>
            <Button row="1" class="-primary" @tap="shareApp">Share</Button>
            <Button row="2" class="-primary" @tap="dummyTestResult">Dummy test result</Button>
            <CallHelplineButton row="3" />
        </GridLayout>
    </Page>
</template>

<script>
    import SelfTest from './SelfTest';
    import SendTest from './SendTest';
    import SocialShare from './SocialShare';
    import Strings from './mixins/Strings'
    import TestResults from './TestResults';
    import CallHelplineButton from "@/components/CallHelplineButton";

    export default {
        components: {CallHelplineButton},
        mixins:[
            SocialShare,
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
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }

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
