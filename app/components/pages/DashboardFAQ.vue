<template>
    <StackLayout orientation="vertical">
        <Label row="0" class="h1">FAQ</Label>
        <WorldMap :loaded="dLoaded" />
    </StackLayout>
</template>

<script lang="ts">
    import WorldMap from "@/components/elements/WorldMap.vue";
    import PageLoaded from "@/components/mixins/PageLoaded.vue";

    export default {
        name: "DashboardFAQ",
        mixins: [PageLoaded],
        components: {WorldMap},
        methods: {

        }
    }
</script>

<style scoped>

</style>