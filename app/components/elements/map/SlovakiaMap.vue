<template>
    <OpenLayersMap :loaded="dLoaded" :disable-interactions="true" :show-real-map="false" :geo-json="geoJson" />
</template>

<script lang="ts">
    import OpenLayersMap from "@/components/elements/map/OpenLayersMap.vue";
    import PageLoaded from "@/components/mixins/PageLoaded.vue";
    import {GeoJson} from "@/js/types/Map";
    import SlovakiaGeoJson from '@/geojson/sk/sk_2_10.json';
    import MapMixin from "@/components/mixins/MapMixin.vue";
    import {FeatureCollection} from "geojson";

    export default {
        name: "SlovakiaMap",
        mixins: [PageLoaded,MapMixin],
        components: {OpenLayersMap},
        data() {
            return {
                geoJson: {
                    geoJson: SlovakiaGeoJson,
                    showText: false,
                    colors: this.generateRandomColors(SlovakiaGeoJson as FeatureCollection),
                    fitMap: true
                } as GeoJson
            }
        }
    }
</script>

<style scoped>

</style>