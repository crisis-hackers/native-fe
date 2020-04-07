<template>
    <StackLayout>
        <SegmentedBar v-model="segmentedBarIndex" @selectedIndexChange="setupHeatMap">
            <SegmentedBarItem v-for="item in segmentedBarItems" :key="item.title" :title="item.title" />
        </SegmentedBar>
        <GridLayout>
            <MapView
                @mapReady="onMapReady"
            />
        </GridLayout>
    </StackLayout>
</template>

<script lang="ts">
    import {Settings} from '@/js/Settings';

    import * as GoogleMaps from "nativescript-google-maps-sdk";

    import * as GoogleMapsUtils from "nativescript-google-maps-utils";

    export default {
        name: "DashboardHome",
        data() {
            return {
                segmentedBarItems: [
                    {
                        title: 'Fever',
                        tag: 'fever'
                    },
                    {
                        title: 'Dry Cough',
                        tag: 'dryCough'
                    }
                ],
                segmentedBarIndex: 0,
                mapView: null
            }
        },
        methods: {
            onMapReady(args) {
                this.mapView = args.object;

                this.setupMap();
                this.setupHeatMap();
            },
            setupMap() {
                this.mapView.settings.compassEnabled = true;
                this.mapView.settings.myLocationButtonEnabled = true;

                this.mapView.zoom = 8;
                let location = Settings.getLastLocation();
                if (location) {
                    this.mapView.latitude = location.latitude;
                    this.mapView.longitude = location.longitude;
                }
            },
            setupHeatMap() {
                let data = [];
                switch (this.segmentedBarItems[this.segmentedBarIndex].tag) {
                    case "dryCough":
                        data = this.getDryCoughData();
                        break;
                    case "fever":
                        data = this.getFeverData();
                        break;
                }
                this.mapView.clear();
                GoogleMapsUtils.setupHeatmap(this.mapView, data);
            },
            getFeverData() {
                let feverData = [{'lng': 47.946966, 'lat': 18.784978}, {'lng': 49.31292, 'lat': 21.378606}, {'lng': 48.426951, 'lat': 16.994058}, {'lng': 47.616161, 'lat': 18.674631}, {'lng': 48.439394, 'lat': 21.862996}, {'lng': 49.031002, 'lat': 21.648734}, {'lng': 48.586983, 'lat': 21.490395}, {'lng': 48.744916, 'lat': 22.251724}, {'lng': 48.740539, 'lat': 17.629498}, {'lng': 47.915683, 'lat': 17.014693}, {'lng': 48.470146, 'lat': 20.219833}, {'lng': 48.45672, 'lat': 17.719505}, {'lng': 48.680575, 'lat': 17.652725}, {'lng': 48.418822, 'lat': 19.01365}, {'lng': 48.641014, 'lat': 20.389604}, {'lng': 48.867398, 'lat': 18.52686}, {'lng': 49.061428, 'lat': 18.607926}, {'lng': 48.534829, 'lat': 18.636501}, {'lng': 48.410753, 'lat': 18.757327}]
                return feverData.map((item) => GoogleMaps.Position.positionFromLatLng(item.lng, item.lat));
            },
            getDryCoughData() {
                let dryCoughData = [{'lng': 48.373606, 'lat': 21.83895}, {'lng': 48.398794, 'lat': 21.923079}, {'lng': 48.426951, 'lat': 16.994058}, {'lng': 48.606273, 'lat': 21.373201}, {'lng': 47.616161, 'lat': 18.674631}, {'lng': 49.031002, 'lat': 21.648734}, {'lng': 48.093997, 'lat': 17.864693}, {'lng': 48.744916, 'lat': 22.251724}, {'lng': 48.470146, 'lat': 20.219833}, {'lng': 48.755612, 'lat': 17.451699}, {'lng': 48.288746, 'lat': 17.741896}, {'lng': 48.45672, 'lat': 17.719505}, {'lng': 48.680575, 'lat': 17.652725}, {'lng': 48.463313, 'lat': 19.138178}, {'lng': 48.610223, 'lat': 21.595733}, {'lng': 48.418822, 'lat': 19.01365}, {'lng': 48.641014, 'lat': 20.389604}, {'lng': 48.867398, 'lat': 18.52686}, {'lng': 49.061428, 'lat': 18.607926}, {'lng': 48.534829, 'lat': 18.636501}, {'lng': 48.410753, 'lat': 18.757327}];
                return dryCoughData.map((item) => GoogleMaps.Position.positionFromLatLng(item.lng, item.lat));
            }
        }
    }
</script>

<style scoped>

</style>