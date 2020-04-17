<template>
    
</template>

<script lang="ts">
    import {Feature, FeatureCollection} from "geojson";
    import {GeoJsonColors} from "@/js/types/Map";

    export default {
        name: "MapMixin",
        data() {
            return {
                mapLightnessSpan: 75,
                mapHue: 204,
                mapSaturation: 61
            }
        },
        methods: {
            generateRandomColors(geoJson: FeatureCollection): GeoJsonColors {
                return geoJson.features.reduce((acc: GeoJsonColors, item: Feature) => {
                    acc[item.id] = `hsl(${this.mapHue}, ${this.mapSaturation}%, ${Math.floor(Math.random() * 50) + 25}%)`;
                    return acc;
                }, {} as GeoJsonColors);
            },
            generateColors(items: { [key: string] : number }): GeoJsonColors {
                if (!items) {
                    return {};
                }
                return Object.entries(items).reduce((acc: GeoJsonColors, [key, value]) => {
                    acc[key] = `hsl(${this.mapHue}, ${this.mapSaturation}%, ${
                        Math.floor((1 - value) * this.mapLightnessSpan) + Math.round((100 - this.mapLightnessSpan) / 2)
                    }%)`;
                    return acc;
                }, {} as GeoJsonColors);
            }
        }
    }
</script>

<style scoped>

</style>