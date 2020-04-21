<template>
    <ActionBar :title="titleToShow" :flat="true" class="ab">
        <StackLayout class="ab-layout" orientation="horizontal" horizontalAlignment="left">
            <SVGImage class="ab-back" v-if="showBackButton" :src="'ic_arrow_back_black'|svg" @tap="$navigateBack"/>
            <Image class="ab-icon" v-if="imgRes" :src="imgRes" />
            <SVGImage class="ab-icon" v-if="imgResSvg" :src="imgResSvg" />
            <Label class="ab-text" :text="titleToShow" verticalAlignment="center" />
        </StackLayout>
    </ActionBar>
</template>

<script lang="ts">
    export default {
        name: "MActionBar",
        props: {
            showBackButton: {
                type: Boolean,
                required: false,
                default: false
            },
            title: {
                type: String,
                required: false
            },
            imgRes: {
                type: String,
                required: false
            },
            imgResSvg: {
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

<style scoped lang="scss">
    $items-margin: 8dp;

    .ab {
        background-color: #f2f2f2;
        color: black;
    }

    .ab-back {
        width: 24dp;
        height: 24dp;
        margin-right: $items-margin;
    }

    .ab-icon {
        margin-right: $items-margin;
        height: 32dp;
        width: 32dp;
    }

    .ab-text {
        font-family: "SF UI Text", 'SFUIText-Semibold';
        color: black;
        font-weight: semibold;
        margin-right: $items-margin;
        font-size: 21dp;
    }
</style>