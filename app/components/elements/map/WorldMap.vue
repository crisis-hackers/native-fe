<template>
    <OpenLayersMap :loaded="dLoaded" :disable-interactions="true" :show-real-map="false" :geo-json="geoJson" />
</template>

<script lang="ts">
    import PageLoaded from "@/components/mixins/PageLoaded.vue";
    import OpenLayersMap from "./OpenLayersMap.vue";
    import MapMixin from "@/components/mixins/MapMixin.vue";
    import WorldGeoJson from "@/geojson/world.json";
    import {GeoJson} from "@/js/Map";
    import {FeatureCollection} from "geojson";

    export default {
        name: "WorldMap",
        components: {OpenLayersMap},
        mixins: [PageLoaded,MapMixin],
        data() {
            return {
                geoJson: {
                    geoJson: this.generateRandomColors(WorldGeoJson as FeatureCollection),
                    showText: false
                } as GeoJson
            }
        }
    }
</script>

<style scoped>

</style>