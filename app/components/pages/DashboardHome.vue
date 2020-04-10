<template>
    <ScrollView orientation="vertical">
        <StackLayout class="main-container" orientation="vertical">
            <FlexboxLayout>
                <Label class="h3 text-text" :textWrap="true" :text="'dashboard.home.text1'|L" />
                <FlexboxLayout>
                    <SlovakiaMap :loaded="dLoaded" style="height: 200dp" />
                </FlexboxLayout>
                <Button class="m-button" :text="'dashboard.home.explore'|L" />
            </FlexboxLayout>
            <FlexboxLayout>
                <Label class="h2 text-subheader" :text="'dashboard.home.header2'|L" />
                <DashboardTable :headers="table1.headers" :rows="table1.rows" :categories="table1.categories" />
            </FlexboxLayout>
            <FlexboxLayout>
                <Label class="h2 text-subheader" :text="'dashboard.home.header3'|L" />
                <FlexboxLayout>
                    <WorldMap :loaded="dLoaded" style="height: 280dp" />
                </FlexboxLayout>
                <DashboardTable :headers="table2.headers" :rows="table2.rows" />
            </FlexboxLayout>
            <GridLayout rows="auto" columns="*,*">
                <DashboardSimpleCard row="0" col="0" value-color="#0061FF" value="112" :label="'dashboard.home.cards.newCasesLabel'|L"/>
                <DashboardSimpleCard row="0" col="1" value-color="#FF0643" value="35%" :label="'dashboard.home.cards.mortalityLabel'|L"/>
            </GridLayout>
        </StackLayout>
    </ScrollView>
</template>

<script lang="ts">
    import * as GoogleMaps from "nativescript-google-maps-sdk";
    import WorldMap from "@/components/elements/map/WorldMap.vue";
    import PageLoaded from "@/components/mixins/PageLoaded.vue";
    import SlovakiaMap from "@/components/elements/map/SlovakiaMap.vue";
    import {TableCategory, TableHeader} from "@/js/types/DashboardTable";
    import DashboardTable from "@/components/elements/DashboardTable.vue";
    import DashboardSimpleCard from "@/components/elements/DashboardSimpleCard.vue";

    export default {
        name: "DashboardHome",
        components: {DashboardSimpleCard, DashboardTable, SlovakiaMap, WorldMap},
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
                mapView: null,
                table1: {
                    categories: [
                        {
                            key: 'age',
                            label: 'By Age'
                        },
                        {
                            key: 'gender',
                            label: 'By Gender'
                        },
                        {
                            key: 'travel',
                            label: 'By Travel'
                        }
                    ] as TableCategory[],
                    headers: [
                        {
                            key: 'age',
                            label: 'Age',
                            width: 1/4
                        },
                        {
                            key: 'confirmed',
                            label: 'Confirmed',
                            width: 1/4,
                            boldCol: true
                        },
                        {
                            key: 'recovered',
                            label: 'Recovered',
                            width: 1/4,
                            boldCol: true
                        },
                        {
                            key: 'deaths',
                            label: 'Deaths',
                            width: 1/4,
                            boldCol: true
                        }
                    ] as TableHeader[],
                    rows: {
                        age: [
                            {
                                age: '0-15 years',
                                confirmed: 73.67,
                                recovered: 45.66,
                                deaths: 45.66
                            },
                            {
                                age: '1-15 years',
                                confirmed: 73.67,
                                recovered: 45.66,
                                deaths: 45.66
                            },
                            {
                                age: '2-15 years',
                                confirmed: 73.67,
                                recovered: 45.66,
                                deaths: 45.66
                            },
                            {
                                age: '3-15 years',
                                confirmed: 73.67,
                                recovered: 45.66,
                                deaths: 45.66
                            }
                        ],
                        gender: [
                            {
                                age: '0-15 years g',
                                confirmed: 73.67,
                                recovered: 45.66,
                                deaths: 45.66
                            },
                            {
                                age: '0-15 years g',
                                confirmed: 73.67,
                                recovered: 45.66,
                                deaths: 45.66
                            },
                            {
                                age: '0-15 years g ',
                                confirmed: 73.67,
                                recovered: 45.66,
                                deaths: 45.66
                            },
                            {
                                age: '0-15 years g',
                                confirmed: 73.67,
                                recovered: 45.66,
                                deaths: 45.66
                            }
                        ],
                        travel: [
                            {
                                age: '0-15 years',
                                confirmed: 73.67,
                                recovered: 45.66,
                                deaths: 45.66
                            },
                            {
                                age: '0-15 years',
                                confirmed: 73.67,
                                recovered: 45.66,
                                deaths: 45.66
                            },
                            {
                                age: '0-15 years',
                                confirmed: 73.67,
                                recovered: 45.66,
                                deaths: 45.66
                            },
                            {
                                age: '0-15 years',
                                confirmed: 73.67,
                                recovered: 45.66,
                                deaths: 45.66
                            }
                        ]
                    }
                },
                table2: {
                    headers: [
                        {
                            key: 'country',
                            label: 'Contry',
                            width: 1/4
                        },
                        {
                            key: 'confirmed',
                            label: 'Confirmed',
                            width: 1/4,
                            boldCol: true
                        },
                        {
                            key: 'recovered',
                            label: 'Recovered',
                            width: 1/4,
                            boldCol: true
                        },
                        {
                            key: 'deaths',
                            label: 'Deaths',
                            width: 1/4,
                            boldCol: true
                        }
                    ] as TableHeader[],
                    rows: [
                        {
                            country: 'Slovakia',
                            confirmed: 73.67,
                            recovered: 45.66,
                            deaths: 45.66
                        },
                        {
                            country: 'United Kingdom',
                            confirmed: 73.67,
                            recovered: 45.66,
                            deaths: 45.66
                        },
                        {
                            country: 'India',
                            confirmed: 73.67,
                            recovered: 45.66,
                            deaths: 45.66
                        },
                        {
                            country: 'China',
                            confirmed: 73.67,
                            recovered: 45.66,
                            deaths: 45.66
                        },
                        {
                            country: 'Iran',
                            confirmed: 73.67,
                            recovered: 45.66,
                            deaths: 45.66
                        }
                    ]
                }
            }
        },
        methods: {
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

<style scoped lang="scss">
    .main-container {
        padding: 8dp 12dp;
    }

    .main-container > * {
        flex-direction: column;
        padding-top: 16dp;
        padding-bottom: 16dp;
        border-width: 0dp;
        border-style: dotted;
        border-bottom-width: 1dp;
        border-color: #bbbbbb;
    }

    /*css selector doesn't seem to work in NS*/
    .main-container > .last-child {
        border-bottom-width: 0;
    }

    .text-subheader {
        text-transform: uppercase;
        font-weight: bold;
    }

    .text-text {
        text-align: center;
        margin-left: 32dp;
        margin-right: 32dp;
    }

    /*.main-container:not(:first-child) {*/
    /*    border-top-width: 1dp;*/
    /*    border-top-color: #53c1ec;*/
    /*    border-style: dotted;*/
    /*    border-width: 1dp;*/
    /*    border-color: black;*/
    /*}*/
</style>