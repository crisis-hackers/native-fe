<template>
    <StackLayout orientation="vertical">
        <SegmentedBar v-model="selectedCategoryId" v-if="categories" class="category-bar">
            <SegmentedBarItem v-for="category in categories" :key="category.key" :title="category.label" />
        </SegmentedBar>
        <GridLayout :rows="rowsString" :columns="columnsString">
            <Label row="0" :colSpan="headers.length" class="bg-header" />
            <Label v-for="i in dataLength" :row="i" :colSpan="headers.length" class="bg-row" />
            <Label v-for="(header, index) in headers" row="0" :col="index" :key="header.key" :text="header.label" class="label-header" />
            <Label v-for="cell in dataCells" :key="`${cell.row}|${cell.col}`" :row="cell.row + 1" :col="cell.col"
                   :text="cell.data" :class="`label-cell${cell.bold ? '-bold' : ''}`"/>
        </GridLayout>
    </StackLayout>
</template>

<script lang="ts">
    import {TableCategory, TableHeader} from "@/js/types/DashboardTable";

    export default {
        name: "DashboardTable",
        props: {
            headers: {
                type: Array as () => TableHeader[],
                required: true
            },
            categories: {
                type: Array as () => TableCategory[],
                required: false,
                default: null
            },
            rows: {
                required: true
            }
        },
        data() {
            return {
                selectedCategoryId: null,
                cells: this.categories ? this.rows[this.categories[0].key] : this.rows
            }
        },
        watch: {
            selectedCategoryId: function(val) {
                if (!this.categories)
                    return;
                this.cells = this.rows[this.categories[val].key];
            }
        },
        computed: {
            columnsString() {
                return this.headers.map((header: TableHeader) => `${Math.round(1/header.width)}*`).join(',');
            },
            dataLength() {
                return this.hasCategories ? this.rows[this.categories[0].key].length : this.rows.length;
            },
            rowsString() {
                return `auto,${Array(this.dataLength).fill('auto').join(',')}`
            },
            hasCategories() {
                return this.categories && true;
            },
            dataCells() {
                return this.cells.flatMap((item: object, index: number) => {
                    return Object.entries(item).map(([key, value]) => {
                        let colInfo = this.columnDataByKey[key];
                        return {
                            row: index,
                            col: colInfo.index,
                            data: value,
                            bold: colInfo.boldCol
                        }
                    });
                })
            },
            columnDataByKey() {
                return this.headers.reduce((acc, curr: TableHeader, index) => {
                    acc[curr.key] = {
                        index: index,
                        boldCol: curr.boldCol
                    };
                    return acc;
                }, {})
            }
        },
        methods: {

        }
    }
</script>

<style scoped lang="scss">
    .category-bar {
        margin-bottom: 4dp;
    }

    .cell-margin {
        margin-top: 4dp;
    }

    .label {
        text-align: center;
        vertical-align: center;
        padding-left: 4dp;
        padding-right: 4dp;

        &-header {
            @extend .label;
            font-weight: bold;
            padding-top: 16dp;
            padding-bottom: 16dp;
        }

        &-cell {
            @extend .label;
            @extend .cell-margin;
            padding-top: 8dp;
            padding-bottom: 8dp;

            &-bold {
                @extend .label-cell;
                font-weight: bold;
            }
        }
    }

    .bg {
        text-align: center;
        border-width: 1dp;
        border-style: solid;
        border-radius: 3%;

        &-header {
            @extend .bg;
            background-color: #eeeeee;
            border-color: #d8d8d8;
        }

        &-row {
            @extend .bg;
            @extend .cell-margin;
            border-color: #f6f6f6;
        }
    }

</style>