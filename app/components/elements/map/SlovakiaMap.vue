<template>
    <OpenLayersMap :loaded="dLoaded" :disable-interactions="true" :show-real-map="false" :geo-json="geoJson" />
</template>

<script lang="ts">
    import OpenLayersMap from "@/components/elements/map/OpenLayersMap.vue";
    import PageLoaded from "@/components/mixins/PageLoaded.vue";
    import {GeoJson} from "@/js/types/Map";
    import SlovakiaGeoJson from '@/geojson/sk/sk_2_10.json';
    import MapMixin from "@/components/mixins/MapMixin.vue";

    export default {
        name: "SlovakiaMap",
        mixins: [PageLoaded,MapMixin],
        components: {OpenLayersMap},
        props: {
            districtData: {
                required: false
            }
        },
        data() {
            return {
                mapHue: 7,
                mapSaturation: 57
            }
        },
        computed: {
            geoJson() : GeoJson {
                return  {
                    geoJson: SlovakiaGeoJson,
                    showText: false,
                    colors: this.generateColors(this.districtData),
                    fitMap: true
                } as GeoJson
            }
        }
    }
</script>

<style scoped>

</style>