<template>
    <Page>
        <ActionBar title="Welcome to NativeScript-Vue!"/>
        <GridLayout columns="*" rows="*">
            <Button class="-primary" @tap="startTest">Start test</Button>
        </GridLayout>
    </Page>
</template>

<script>
    import SelfTest from './SelfTest';

    export default {
        data() {
              return {
                    msg: 'Hello World!'
              }
        },
        methods: {
            startTest() {
                this.$navigateTo(SelfTest);
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
