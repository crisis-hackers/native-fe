<template>
    <GridLayout row="*,*" columns="*">
        <Label row="0" class="h1">FAQ</Label>
        <WorldMap row="1" style="background-color: #333333" :loaded="dLoaded" />
    </GridLayout>
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