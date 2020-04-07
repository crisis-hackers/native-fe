<template>
    <Page>
        <ActionBar :title="str.appName" />
        <Tabs selectedIndex="0" tabsPosition="bottom">
            <TabStrip>
                <TabStripItem>
                    <Label>Home</Label>
                </TabStripItem>
                <TabStripItem>
                    <Label>Tracking</Label>
                </TabStripItem>
                <TabStripItem>
                    <Label>FAQ</Label>
                </TabStripItem>
                <TabStripItem>
                    <Label>Profile</Label>
                </TabStripItem>
            </TabStrip>
            <TabContentItem>
                <DashboardHome />
            </TabContentItem>
            <TabContentItem>
                <DashboardTracking />
            </TabContentItem>
            <TabContentItem>
                <DashboardFAQ />
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

    export default {
        name: "Dashboard",
        mixins: [
            Strings
        ],
        components: {
            DashboardFAQ,
            DashboardHome,
            DashboardProfile,
            DashboardTracking
        }
    }
</script>

<style scoped>

</style>