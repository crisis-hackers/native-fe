<template>
    <Page>
        <ActionBar title="Welcome to NativeScript-Vue!"/>
        <GridLayout columns="*" rows="*">
            <Label></Label>
            <Button></Button>
        </GridLayout>
    </Page>
</template>

<script lang="ts">
  export default {
    data() {
      return {
        msg: 'Hello World!'
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
