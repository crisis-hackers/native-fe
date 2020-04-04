<template>
    <Page>
        <ActionBar title="Welcome to NativeScript-Vue!"/>
        <GridLayout columns="*" rows="*,*">
            <Button row="0" class="-primary" @tap="startTest">Start test</Button>
            <Button row="1" class="-primary" @tap="dummySendTest">Dummy send test</Button>
        </GridLayout>
    </Page>
</template>

<script>
    import SelfTest from './SelfTest';
    import SendTest from './SendTest';

    export default {
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
