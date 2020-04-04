<template>
    <StackLayout orientation="vertical">
        <GridLayout rows="*" columns="*,*">
            <Label row="0" col="0">Total tests</Label>
            <Label row="0" col="1">{{ totalTests }}</Label>
        </GridLayout>
    </StackLayout>
</template>

<script>
    import settings from "@/js/Settings";

    export default {
        name: "DashboardTracking",
        computed: {
            totalTests() {
                return settings.getResults().length;
            }
        }
    }
</script>

<style scoped>

</style>