<template>
    <Page>
        <ActionBar :title="`Welcome to ${str.appName}!`"/>
        <GridLayout columns="*" rows="*,*,*,*">
            <Button row="0" class="-primary" @tap="startTest">Start test</Button>
            <Button row="1" class="-primary" @tap="dummySendTest">Dummy send test</Button>
            <Button row="2" class="-primary" @tap="shareApp">Share</Button>
            <Button row="3" class="-primary" @tap="dummyTestResult">Dummy test result</Button>
        </GridLayout>
    </Page>
</template>

<script>
    import SelfTest from './SelfTest';
    import SendTest from './SendTest';
    import SocialShare from './SocialShare';
    import Strings from './mixins/Strings'
    import TestResults from './TestResults';

    export default {
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
</style>
