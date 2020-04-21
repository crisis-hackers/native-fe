<template>
    <OpenLayersMap :disable-interactions="false" :loaded="dLoaded" :show-real-map="true" :heatmap="heatmap"
                   :show-location="true" @zoomChanged="zoomChanged" :geo-json="geoJson" />
</template>

<script lang="ts">
    import PageLoaded from "../../mixins/PageLoaded.vue";
    import OpenLayersMap from "./OpenLayersMap.vue";
    import {GeoJson, HeatMap, ZoomChangedEvent} from "@/js/types/Map";
    import MunicipalityGeoJson from "@/geojson/sk/suburb_polygons_20.json";
    import DistrictGeoJson from "@/geojson/sk/sk_2_10.json";
    import {SymptCasesLocationDistrictData, SymptCasesLocationMunicipalityData} from "@/js/BE";
    import MapMixin from "@/components/mixins/MapMixin.vue";

    export default {
        name: "NearMeMap",
        components: {OpenLayersMap},
        mixins: [PageLoaded,MapMixin],
        props: {
            heatmap: {
                type: Array as () => HeatMap,
                required: false
            },
            districtData: {
                type: Object as () => SymptCasesLocationDistrictData,
                required: true
            },
            municipalityData: {
                type: Object as () => SymptCasesLocationMunicipalityData,
                required: true
            }
        },
        data() {
            return {
                zoomLevel: null,
                mapAlpha: 0.4,
                municipalityZoomThreshold: 10
            }
        },
        computed: {
            districtGeoJson(): GeoJson {
                return {
                    geoJson: DistrictGeoJson,
                    fitMap: !this.zoomLevel, //fit map for the first time
                    showText: false,
                    colors: this.generateColors(this.districtData)
                } as GeoJson
            },
            municipalityGeoJson(): GeoJson {
                return {
                    geoJson: MunicipalityGeoJson,
                    fitMap: false,
                    showText: false,
                    colors: this.generateColors(this.municipalityData)
                } as GeoJson
            },
            geoJson() {
                return this.zoomLevel && this.zoomLevel > this.municipalityZoomThreshold ?
                    this.municipalityGeoJson :
                    this.districtGeoJson
            },

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