<template>
    <Page ref="page">
        <MActionBar :title="`${str.appName}`" :img-res-svg="'group-21'|svg" />
        <FlexboxLayout flexDirection="column" justifyContent="space-between" class="main">
            <FlexboxLayout flexDirection="column">
                <SVGImage :src="'symptio_heart'|svg" height="128dp" width="164dp" />
                <Label class="h2" text="Welcome to Sympt.io" />
                <Button row="0" class="m-button m-green-button" @tap="startTest" :text="'buttons.startSelfTest'|L" />
            </FlexboxLayout>
            <FlexboxLayout flexDirection="column">
                <Button row="3" class="m-button" @tap="devStartDashboard">!!DEV!! dashboard</Button>
                <CallHelplineButton />
            </FlexboxLayout>
        </FlexboxLayout>
    </Page>
</template>

<script lang="ts">
    import SelfTest from '@/components/pages/SelfTest.vue';
    import Strings from '@/components/mixins/Strings.vue'
    import CallHelplineButton from "@/components/elements/CallHelplineButton.vue";
    import SocialShareButton from "@/components/elements/SocialShareButton.vue";
    import Dashboard from "@/components/pages/Dashboard.vue";
    import MActionBar from "@/components/elements/MActionBar.vue";

    export default {
        components: {MActionBar, SocialShareButton, CallHelplineButton},
        mixins:[
            Strings
        ],
        methods: {
            startTest() {
                this.$navigateTo(SelfTest);
            },
            devStartDashboard() {
                this.$navigateTo(Dashboard);
            }
        }
    }
</script>

<style scoped>
    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }

    .main {
        padding: 32dp 16dp;
    }

    .main Label {
        text-align: center;
    }
</style>
