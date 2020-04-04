<template>
    <Page>
        <ActionBar :title="str.appName" />
        <GridLayout>

        </GridLayout>
    </Page>
</template>

<script>
    import Strings from './mixins/Strings'

    export default {
        name: "Dashboard",
        mixins: [
            Strings
        ]
    }
</script>

<style scoped>

</style>