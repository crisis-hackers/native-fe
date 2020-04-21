<template>
    <DashboardTable :headers="headers" :rows="rows" />
</template>

<script lang="ts">
    import {CountriesData, CountryData} from "../../js/BE";
    import {TableHeader} from "../../js/types/DashboardTable";
    import DashboardTable from "@/components/elements/DashboardTable.vue";

    export default {
        name: "DashboardWorldTable",
        components: {DashboardTable},
        props: {
            countriesData: {
                type: Array as () => CountriesData,
                required: true
            }
        },
        data() {
            return {
                headers: [
                    {
                        key: 'countriesandterritories',
                        label: 'Contry',
                        width: 1/3
                    },
                    {
                        key: 'total_cases',
                        label: 'Confirmed',
                        width: 1/3,
                        boldCol: true
                    },
                    {
                        key: 'total_deaths',
                        label: 'Deaths',
                        width: 1/3,
                        boldCol: true
                    }
                ] as TableHeader[],
            }
        },
        computed: {
            rows() {
                return this.countriesData
                    .sort((a: CountryData, b: CountryData) => b.total_cases - a.total_cases)
                    .slice(0, 5);
            }
        },
    }
</script>

<style scoped>

</style>