<template>
    <StackLayout orientation="vertical">
        <Label row="0" class="h1">FAQ</Label>
        <OpenLayersMap :loaded="dLoaded" :show-real-map="false" :disable-interactions="true" />
    </StackLayout>
</template>

<script lang="ts">
    import OpenLayersMap from "@/components/elements/map/OpenLayersMap.vue";
    import PageLoaded from "@/components/mixins/PageLoaded.vue";

    export default {
        name: "DashboardFAQ",
        mixins: [PageLoaded],
        components: {OpenLayersMap},
        methods: {

        }
    }
</script>

<style scoped>

</style>