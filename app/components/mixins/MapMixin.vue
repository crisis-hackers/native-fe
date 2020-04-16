<template>
    
</template>

<script lang="ts">
    import {Feature, FeatureCollection} from "geojson";
    import {GeoJsonColors} from "@/js/types/Map";

    export default {
        name: "MapMixin",
        methods: {
            generateRandomColors(geoJson: FeatureCollection): GeoJsonColors {
                return  geoJson.features.reduce((acc: GeoJsonColors, item: Feature) => {
                    acc[item.id] = `hsl(204, 61%, ${Math.floor(Math.random() * 50) + 25}%)`;
                    return acc;
                }, {} as GeoJsonColors);
            }
        }
    }
</script>

<style scoped>

</style>