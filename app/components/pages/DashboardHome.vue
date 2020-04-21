<template>
    <GridLayout rows="*" columns="*">
        <ScrollView row="0" col="0" :class="`${loading ? 'loading-disabled' : ''}`" orientation="vertical">
            <StackLayout class="main-container" orientation="vertical">
                <FlexboxLayout>
                    <Label class="h3 text-text" :textWrap="true" :text="'dashboard.home.text1'|L" />
                    <FlexboxLayout>
                        <SlovakiaMap :district-data="beData.symptCasesLocationDistrictData" :loaded="dLoaded" style="height: 200dp" />
                    </FlexboxLayout>
                    <Button class="m-button" @tap="navigateExplore" :text="'dashboard.home.explore'|L" />
                </FlexboxLayout>
                <FlexboxLayout>
                    <Label class="h2 text-subheader" :text="'dashboard.home.header2'|L" />
                    <DashboardSymptTable :age-data="beData.symptCasesAgeData" :sex-data="beData.symptCasesSexData" />
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
                    <DashboardSimpleCard row="0" col="1" value-color="#FF0643" :value="mortalityRate" :label="'dashboard.home.cards.mortalityLabel'|L"/>
                </GridLayout>
            </StackLayout>
        </ScrollView>
        <ActivityIndicator rowSpan="1" col="0" :busy="loading" />
    </GridLayout>
</template>

<script lang="ts">
    import WorldMap from "@/components/elements/map/WorldMap.vue";
    import PageLoaded from "@/components/mixins/PageLoaded.vue";
    import SlovakiaMap from "@/components/elements/map/SlovakiaMap.vue";
    import DashboardTable from "@/components/elements/DashboardTable.vue";
    import DashboardSimpleCard from "@/components/elements/DashboardSimpleCard.vue";
    import NearMe from "@/components/pages/NearMe.vue";
    import BE, {
        CountriesData,
        DashboardData,
        MortalityRateData,
        SymptCasesAgeData,
        SymptCasesLocationDistrictData,
        SymptCasesLocationMunicipalityData,
        SymptCasesRiskData,
        SymptCasesSexData
    } from "@/js/BE";
    import DashboardWorldTable from "@/components/elements/DashboardWorldTable.vue";
    import DashboardSymptTable from "@/components/elements/DashboardSymptTable.vue";

    export default {
        name: "DashboardHome",
        components: {
            DashboardSymptTable,
            DashboardWorldTable, DashboardSimpleCard, DashboardTable, SlovakiaMap, WorldMap},
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
                beData: {
                    countriesData: [] as CountriesData,
                    symptCasesLocationDistrictData: {} as SymptCasesLocationDistrictData,
                    symptCasesLocationMunicipalityData: {} as SymptCasesLocationMunicipalityData,
                    mortalityRate: null as MortalityRateData,
                    symptCasesAgeData: {} as SymptCasesAgeData,
                    symptCasesSexData: {} as SymptCasesSexData,
                    symptCasesRiskData: {} as SymptCasesRiskData,
                },
                loading: false
            }
        },
        computed: {
            mortalityRate() {
                return `${(this.beData.mortalityRate*100).toFixed(1)}%`
            }
        },
        methods: {
            navigateExplore(): void {
                this.$navigateTo(NearMe, {
                    props: {
                        districtData: this.beData.symptCasesLocationDistrictData,
                        municipalityData: this.beData.symptCasesLocationMunicipalityData
                    }
                });
            },
            getData(): void {
                this.loading = true;
                BE.getAllDashboardData()
                    .then((data: DashboardData) => {
                        this.beData.countriesData = data.countriesData.data;
                        this.beData.symptCasesLocationDistrictData = data.symptCasesLocationDistrictData.data;
                        this.beData.symptCasesLocationMunicipalityData = data.symptCasesLocationMunicipalityData.data;
                        this.beData.mortalityRate = data.mortalityRate.data;
                        this.beData.symptCasesAgeData = data.symptCasesAgeData.data;
                        this.beData.symptCasesSexData = data.symptCasesSexData.data;
                        this.beData.symptCasesRiskData = data.symptCasesRiskData.data;
                    })
                    .finally(() => {
                        this.loading = false;
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