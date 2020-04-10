<template>
    <Page @loaded="pageHasLoaded">
        <ActionBarBackButton :title="'nearMe.title'|L" />
        <GridLayout rows="auto,*" columns="*">
            <SegmentedBar v-model="segmentedBarIndex">
                <SegmentedBarItem v-for="item in segmentedBarItems" :key="item.tag"
                                  :title="`dashboard.heatmap.tags.${item.tag}.title`|L" />
            </SegmentedBar>
            <NearMeMap row="1" col="0" :loaded="dLoaded" :heatmap="heatmap" />
        </GridLayout>
    </Page>
</template>

<script lang="ts">
    import PageLoaded from "../mixins/PageLoaded.vue";
    import NearMeMap from "../elements/map/NearMeMap.vue";
    import ActionBarBackButton from "@/components/elements/ActionBarBackButton.vue";
    import {HeatMap} from "@/js/Map";
    import BE, {NearMeData} from "@/js/BE";

    export default {
        name: "NearMe",
        components: {ActionBarBackButton, NearMeMap},
        mixins: [PageLoaded],
        data() {
            return {
                segmentedBarItems: [
                    {
                        tag: 'fever'
                    },
                    {
                        tag: 'dryCough'
                    }
                ],
                segmentedBarIndex: 0,
                heatmap: this.getFeverData()
            }
        },
        watch: {
            segmentedBarIndex: function (value) {
                switch (this.segmentedBarItems[value].tag) {
                    case "fever":
                        this.heatmap = this.getFeverData();
                        break
                    case "dryCough":
                        this.heatmap = this.getDryCoughData();
                        break
                }
            }
        },
        methods: {
            getFeverData(): HeatMap {
                return [{"lat":47.946966,"lng":18.784978},{"lat":49.31292,"lng":21.378606},{"lat":48.426951,"lng":16.994058},{"lat":47.616161,"lng":18.674631},{"lat":48.439394,"lng":21.862996},{"lat":49.031002,"lng":21.648734},{"lat":48.586983,"lng":21.490395},{"lat":48.744916,"lng":22.251724},{"lat":48.740539,"lng":17.629498},{"lat":47.915683,"lng":17.014693},{"lat":48.470146,"lng":20.219833},{"lat":48.45672,"lng":17.719505},{"lat":48.680575,"lng":17.652725},{"lat":48.418822,"lng":19.01365},{"lat":48.641014,"lng":20.389604},{"lat":48.867398,"lng":18.52686},{"lat":49.061428,"lng":18.607926},{"lat":48.534829,"lng":18.636501},{"lat":48.410753,"lng":18.757327}]
            },
            getDryCoughData(): HeatMap {
                return [{"lat":48.373606,"lng":21.83895},{"lat":48.398794,"lng":21.923079},{"lat":48.426951,"lng":16.994058},{"lat":48.606273,"lng":21.373201},{"lat":47.616161,"lng":18.674631},{"lat":49.031002,"lng":21.648734},{"lat":48.093997,"lng":17.864693},{"lat":48.744916,"lng":22.251724},{"lat":48.470146,"lng":20.219833},{"lat":48.755612,"lng":17.451699},{"lat":48.288746,"lng":17.741896},{"lat":48.45672,"lng":17.719505},{"lat":48.680575,"lng":17.652725},{"lat":48.463313,"lng":19.138178},{"lat":48.610223,"lng":21.595733},{"lat":48.418822,"lng":19.01365},{"lat":48.641014,"lng":20.389604},{"lat":48.867398,"lng":18.52686},{"lat":49.061428,"lng":18.607926},{"lat":48.534829,"lng":18.636501},{"lat":48.410753,"lng":18.757327}];
            },
            getData(): void {
                BE.getNearMeData()
                    .then((nearMeData: NearMeData) => {
                        console.log('nearMeHeatmapData');
                        console.dir(nearMeData.heatMap.data);
                    })
            }
        },
        mounted(): void {
            this.getData();
        }
    }
</script>

<style scoped>

</style>