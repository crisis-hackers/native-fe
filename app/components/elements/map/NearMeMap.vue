<template>
    <OpenLayersMap :disable-interactions="false" :loaded="dLoaded" :show-real-map="true" :heatmap="heatmap"
                   :show-location="true" @zoomChanged="zoomChanged" :geo-json="geoJson" />
</template>

<script lang="ts">
    import PageLoaded from "../../mixins/PageLoaded.vue";
    import OpenLayersMap from "./OpenLayersMap.vue";
    import {GeoJson, HeatMap, ZoomChangedEvent} from "@/js/types/Map";
    import Sk2 from "@/geojson/sk/sk_2_10.json";
    import World from "@/geojson/world.json";

    export default {
        name: "NearMeMap",
        components: {OpenLayersMap},
        mixins: [PageLoaded],
        props: {
            heatmap: {
                type: Array as () => HeatMap,
                required: false
            }
        },
        data() {
            return {
                sk1: {
                    geoJson: Sk2,
                    showText: false,
                    fitMap: false
                } as GeoJson,
                sk2: {
                    geoJson: World,
                    showText: false,
                    fitMap: false
                } as GeoJson,
                zoomLevel: null
            }
        },
        computed: {
            geoJson() {
                return this.zoomLevel && this.zoomLevel > 6 ?
                    this.sk1 :
                    this.sk2
            }
        },
        methods: {
            zoomChanged(event: ZoomChangedEvent) {
                this.zoomLevel = event.newZoom;
            }
        }
    }
</script>

<style scoped>

</style>