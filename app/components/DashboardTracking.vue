<template>
    <StackLayout orientation="vertical" padding="16dp">
        <GridLayout rows="*" columns="*,*">
            <Label class="h2" row="0" col="0">Total tests</Label>
            <Label class="h2" row="0" col="1" textAlignment="right">{{ totalTests }}</Label>
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