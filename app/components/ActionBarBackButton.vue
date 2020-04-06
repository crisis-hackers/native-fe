<template>
    <ActionBar :title="title">
        <NavigationButton icon="res://ic_arrow_back_black_24dp" @tap="$navigateBack"/>
    </ActionBar>
</template>

<script>
    export default {
        name: "ActionBarBackButton",
        props: {
            title: {
                type: String,
                default: 'Q-Tracker'
            }
        }
    }
</script>

<style scoped>

</style>