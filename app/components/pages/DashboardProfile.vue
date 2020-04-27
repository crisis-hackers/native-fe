<template>
    <GridLayout class="main-layout" rows="*,auto" columns="*">
        <FlexboxLayout row="0" flexDirection="column" justifyContent="center">
            <SVGImage :src="'profile_pic'|svg" class="profile-pic" />
        </FlexboxLayout>
        <StackLayout row="1" orientation="vertical">
            <Button class="m-button" :text="'dashboard.profile.downloadData'|L" @tap="downloadData" />
            <Button class="m-button" :text="'dashboard.profile.deleteData'|L" @tap="deleteData" />
        </StackLayout>
    </GridLayout>

</template>

<script lang="ts">
    import {openUrl} from 'tns-core-modules/utils/utils'
    import {default as BE, downloadDataURL} from "@/js/BE";
    import {confirm} from 'tns-core-modules/ui/dialogs/dialogs'
    import {Settings} from "@/js/Settings";
    import Intro from "@/components/pages/Intro.vue";

    export default {
        name: "DashboardProfile",

        methods: {
            downloadData() {
                openUrl(downloadDataURL);
            },
            deleteData() {
                confirm({
                    title: this.$options.filters.L('dashboard.profile.deleteDataDialog.title'),
                    message: this.$options.filters.L('dashboard.profile.deleteDataDialog.text'),
                    cancelable: true,
                    okButtonText: this.$options.filters.L('buttons.yes'),
                    cancelButtonText: this.$options.filters.L('buttons.no')
                })
                .then(result => {
                    if (!result) {
                        return;
                    }
                    BE.deletePersonalData()
                        .then(() => {
                            Settings.clearAll();
                            this.$navigateTo(Intro, {
                                clearHistory: true
                            });
                        })
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .main-layout {
        padding: 16dp;
    }

    .profile-pic {
        height: 128dp;
    }
</style>