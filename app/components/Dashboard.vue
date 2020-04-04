<template>
    <Page>
        <ActionBar :title="str.appName" />
        <Tabs selectedIndex="1" tabsPosition="bottom">
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

<script>
    import Strings from './mixins/Strings';
    import DashboardFAQ from "@/components/DashboardFAQ";
    import DashboardHome from "@/components/DashboardHome";
    import DashboardProfile from "@/components/DashboardProfile";
    import DashboardTracking from "@/components/DashboardTracking";

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