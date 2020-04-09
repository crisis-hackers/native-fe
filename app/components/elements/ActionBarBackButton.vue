<template>
    <ActionBar :title="titleToShow">
        <NavigationButton icon="res://ic_arrow_back_black_24dp" @tap="$navigateBack"/>
    </ActionBar>
</template>

<script lang="ts">
    export default {
        name: "ActionBarBackButton",
        props: {
            title: {
                type: String,
                required: false
            }
        },
        computed: {
            titleToShow() {
                return this.title ?? this.$options.filters.L('app.name')
            }
        }
    }
</script>

<style scoped>

</style>