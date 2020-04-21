<template>
    <DashboardTable :categories="categories" :headers="headers" :rows="rows"/>
</template>

<script lang="ts">
    import {TableCategory, TableHeader} from "@/js/types/DashboardTable";
    import DashboardTable from "./DashboardTable.vue";
    import {SymptCasesAgeData, SymptCasesSexData} from "@/js/BE";

    export default {
        name: "DashboardSymptTable",
        components: {DashboardTable},
        props: {
            ageData: {
                type: Object as () => SymptCasesAgeData,
                required: true
            },
            sexData: {
                type: Object as () => SymptCasesSexData,
                required: true
            }
        },
        data() {
            return {
                categories: [
                    {
                        key: 'age',
                        label: this.$options.filters.L('dashboard.home.symptTable.byAge')
                    },
                    {
                        key: 'sex',
                        label: this.$options.filters.L('dashboard.home.symptTable.bySex')
                    }
                ] as TableCategory[],
                headers: [
                    {
                        key: 'group',
                        boldCol: true,
                        label: '',
                        width: 1/4
                    },
                    {
                        key: '1',
                        boldCol: true,
                        label: this.$options.filters.L('dashboard.home.symptResults.1'),
                        width: 1/4
                    },
                    {
                        key: '2',
                        boldCol: true,
                        label: this.$options.filters.L('dashboard.home.symptResults.2'),
                        width: 1/4
                    },
                    {
                        key: '3',
                        boldCol: true,
                        label: this.$options.filters.L('dashboard.home.symptResults.3'),
                        width: 1/4
                    },
                ] as TableHeader[]
            }
        },
        computed: {
            rows() {
                return {
                    age: this.transformData(this.ageData),
                    sex: this.transformData(this.sexData)
                }
            }
        },
        methods: {
            transformData(data: object) {
                return Object.values(
                    //@ts-ignore
                    Object.entries(data).flatMap(([symptR, sValue]) =>
                        Object.entries(sValue).map(([group, value]) => [group, symptR, value])
                    )
                        .reduce((acc, [group, symptR, value]) => {
                            if (!(group in acc)) {
                                acc[group] = {
                                    group: group
                                }
                            }
                            acc[group][symptR] = value;
                            return acc;
                        }, {})
                ).sort((a: object, b: object) => (a['group'] as string).localeCompare(b['group'] as string));
            }
        }
    }
</script>

<style scoped>

</style>