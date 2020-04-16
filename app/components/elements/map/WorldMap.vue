<template>
    <OpenLayersMap :loaded="dLoaded" :disable-interactions="true" :show-real-map="false" :geo-json="geoJson" />
</template>

<script lang="ts">
    import PageLoaded from "@/components/mixins/PageLoaded.vue";
    import OpenLayersMap from "./OpenLayersMap.vue";
    import MapMixin from "@/components/mixins/MapMixin.vue";
    import WorldGeoJson from "@/geojson/world.json";
    import {GeoJson} from "@/js/types/Map";
    import {FeatureCollection} from "geojson";
    import {CountriesData, CountryData} from "@/js/BE";

    export default {
        name: "WorldMap",
        components: {OpenLayersMap},
        mixins: [PageLoaded,MapMixin],
        props: {
            countriesData: {
                type: Array as () => CountriesData,
                required: true
            }
        },
        computed: {
            geoJson(): GeoJson {
                return {
                    geoJson: this.generateWorldColors(this.countriesData, WorldGeoJson as FeatureCollection),
                    showText: false,
                    fitMap: true
                } as GeoJson
            }
        },
        methods: {
            generateWorldColors(countriesData: CountriesData, geoJson: FeatureCollection): FeatureCollection {
                let maxCases = countriesData.reduce((currMax: number, curr: CountryData) => {
                    return curr.total_cases > currMax ? curr.total_cases : currMax;
                }, Number.MIN_VALUE);
                let keyedData = countriesData.reduce((acc: object, curr: CountryData) => {
                    acc[curr.countryterritorycode] = curr;
                    return acc;
                }, {});
                geoJson.features.forEach((feature) => {
                    let country = keyedData[feature.id] as CountryData;
                    if (!country) {
                        console.log(`no such country: ${feature.id}`)
                    } else {
                        let value = Math.log(country.total_cases) / Math.log(maxCases);
                        feature.properties['color'] = `hsl(204, 61%, ${
                            Math.floor((1-value) * this.mapLightnessSpan) + Math.round((100 - this.mapLightnessSpan) / 2)
                        }%)`;
                    }
                });
                return geoJson;
            }
        },
        data() {
            return {
                mapLightnessSpan: 75
            }
        }
    }
</script>

<style scoped>

</style>