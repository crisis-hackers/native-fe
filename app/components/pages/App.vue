<template>
    <Page ref="page">
        <MActionBar :title="`${str.appName}`" :img-res-svg="'group-21'|svg" />
        <GridLayout columns="*" rows="*,*,*,*" class="main">
            <Button row="0" class="m-button m-green-button" @tap="startTest" :text="'buttons.startSelfTest'|L" />
            <SocialShareButton row="1" />
            <CallHelplineButton row="2" />
            <Button row="3" class="m-button" @tap="devStartDashboard">!!DEV!! dashboard</Button>
        </GridLayout>
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
        padding-left: 16dp;
        padding-right: 16dp;
    }
</style>
