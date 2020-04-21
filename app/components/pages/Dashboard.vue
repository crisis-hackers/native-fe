<template>
    <Page @loaded="pageHasLoaded">
        <MActionBar :title="str.appName" />
        <Tabs selectedIndex="0" tabsPosition="bottom">
            <TabStrip>
                <TabStripItem>
                    <Label :text="'dashboard.tabs.home'|L" />
                </TabStripItem>
                <TabStripItem>
                    <Label :text="'dashboard.tabs.tracking'|L" />
                </TabStripItem>
                <TabStripItem>
                    <Label :text="'dashboard.tabs.faq'|L" />
                </TabStripItem>
                <TabStripItem>
                    <Label :text="'dashboard.tabs.profile'|L" />
                </TabStripItem>
            </TabStrip>
            <TabContentItem>
                <DashboardHome :loaded="dLoaded" />
            </TabContentItem>
            <TabContentItem>
                <DashboardTracking />
            </TabContentItem>
            <TabContentItem>
                <DashboardFAQ :loaded="dLoaded" />
            </TabContentItem>
            <TabContentItem>
                <DashboardProfile />
            </TabContentItem>

        </Tabs>
    </Page>
</template>

<script lang="ts">
    import Strings from '@/components/mixins/Strings.vue';
    import DashboardFAQ from "@/components/pages/DashboardFAQ.vue";
    import DashboardHome from "@/components/pages/DashboardHome.vue";
    import DashboardProfile from "@/components/pages/DashboardProfile.vue";
    import DashboardTracking from "@/components/pages/DashboardTracking.vue";
    import PageLoaded from "@/components/mixins/PageLoaded.vue";
    import MActionBar from "@/components/elements/MActionBar.vue";

    export default {
        name: "Dashboard",
        mixins: [
            Strings, PageLoaded
        ],
        components: {
            MActionBar,
            DashboardFAQ,
            DashboardHome,
            DashboardProfile,
            DashboardTracking
        }
    }
</script>

<style scoped>

</style>