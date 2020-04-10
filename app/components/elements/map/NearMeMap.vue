<template>
    <OpenLayersMap :disable-interactions="false" :loaded="dLoaded" :show-real-map="true" :heatmap="heatmap" :show-location="true" />
</template>

<script lang="ts">
    import PageLoaded from "../../mixins/PageLoaded.vue";
    import OpenLayersMap from "./OpenLayersMap.vue";
    import {HeatMap} from "@/js/Map";

    export default {
        name: "NearMeMap",
        components: {OpenLayersMap},
        mixins: [PageLoaded],
        props: {
            heatmap: {
                type: Array as () => HeatMap,
                required: false
            }
        }
    }
</script>

<style scoped>

</style>