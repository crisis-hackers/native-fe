<template>
    
</template>

<script lang="ts">
    import {Feature, FeatureCollection} from "geojson";

    export default {
        name: "MapMixin",
        methods: {
            generateRandomColors(geoJson: FeatureCollection): FeatureCollection {
                geoJson.features.forEach((item: Feature) => {
                    item.properties['color'] = `hsl(204, 61%, ${Math.floor(Math.random() * 50) + 25}%)`;
                });
                return geoJson;
            }
        }
    }
</script>

<style scoped>

</style>