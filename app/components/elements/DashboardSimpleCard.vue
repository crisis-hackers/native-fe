<template>
    <GridLayout rows="auto,auto" columns="*" class="card-bg">
        <Label row="0" col="0" class="h1" :style="{ color: valueColor }" :text="value" />
        <Label row="1" col="0" class="h3" textWrap="true" :text="label" />
    </GridLayout>
</template>

<script lang="ts">
    export default {
        name: "DashboardSimpleCard",
        props: {
            valueColor: {
                type: String,
                required: true
            },
            value: {
                type: String,
                required: true
            },
            label: {
                type: String,
                required: true
            }
        }
    }
</script>

<style scoped lang="scss">
    .card-bg {
        background-color: #fefefe;
        border-radius: 10%;
        border-width: 1dp;
        border-color: #efefef;
        padding: 16dp;
        margin: 8dp;
    }

    .card-bg > * {
        text-align: center;
        text-transform: uppercase;
        font-weight: bold;
    }
</style>