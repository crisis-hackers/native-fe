<template>
    <ScrollView orientation="vertical">
        <StackLayout class="main-container" orientation="vertical">
            <FlexboxLayout>
                <Label class="h3 text-text" :textWrap="true" :text="'dashboard.home.text1'|L" />
                <FlexboxLayout>
                    <SlovakiaMap :loaded="dLoaded" style="height: 200dp" />
                </FlexboxLayout>
                <Button class="m-button" @tap="navigateExplore" :text="'dashboard.home.explore'|L" />
            </FlexboxLayout>
            <FlexboxLayout>
                <Label class="h2 text-subheader" :text="'dashboard.home.header2'|L" />
                <DashboardTable :headers="table1.headers" :rows="table1.rows" :categories="table1.categories" />
            </FlexboxLayout>
            <FlexboxLayout>
                <Label class="h2 text-subheader" :text="'dashboard.home.header3'|L" />
                <FlexboxLayout>
                    <WorldMap :countries-data="beData.countriesData" :loaded="dLoaded" style="height: 280dp" />
                </FlexboxLayout>
                <DashboardWorldTable :countries-data="beData.countriesData" />
            </FlexboxLayout>
            <GridLayout rows="auto" columns="*,*">
                <DashboardSimpleCard row="0" col="0" value-color="#0061FF" value="112" :label="'dashboard.home.cards.newCasesLabel'|L"/>
                <DashboardSimpleCard row="0" col="1" value-color="#FF0643" value="35%" :label="'dashboard.home.cards.mortalityLabel'|L"/>
            </GridLayout>
        </StackLayout>
    </ScrollView>
</template>

<script lang="ts">
    import WorldMap from "@/components/elements/map/WorldMap.vue";
    import PageLoaded from "@/components/mixins/PageLoaded.vue";
    import SlovakiaMap from "@/components/elements/map/SlovakiaMap.vue";
    import {TableCategory, TableHeader} from "@/js/types/DashboardTable";
    import DashboardTable from "@/components/elements/DashboardTable.vue";
    import DashboardSimpleCard from "@/components/elements/DashboardSimpleCard.vue";
    import NearMe from "@/components/pages/NearMe.vue";
    import BE, {CountriesData, DashboardData} from "@/js/BE";
    import DashboardWorldTable from "@/components/elements/DashboardWorldTable.vue";

    export default {
        name: "DashboardHome",
        components: {DashboardWorldTable, DashboardSimpleCard, DashboardTable, SlovakiaMap, WorldMap},
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
                },
                beData: {
                    countriesData: [] as CountriesData
                }
            }
        },
        methods: {
            navigateExplore(): void {
                this.$navigateTo(NearMe);
            },
            getData(): void {
                BE.getAllDashboardData()
                    .then((data: DashboardData) => {
                        this.beData.countriesData = data.countriesData.data;
                    })
            }
        },
        mounted(): void {
            this.getData();
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