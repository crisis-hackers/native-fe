<template>
    <Page actionBarHidden="true">
        <GridLayout rows="*, 90" columns="*">
            <Tabs row="0" col="0" :selectedIndex="currentPage" @selectedIndexChanged="tabChanged">
                <TabContentItem v-for="page in pages" class="m-tab-view-item">
                    <FlexboxLayout flexDirection="column" justifyContent="center"
                                   alignItems="center" :paddingLeft="layout.mainXPadding" :paddingRight="layout.mainXPadding">
                        <Image :src="page.image" stretch="none" />
                        <Label class="title h1" textWrap="true" :text="`intro.${page.key}.title`|L" />
                        <Label class="subtitle h3" textWrap="true" :text="`intro.${page.key}.subtitle`|L" />
                    </FlexboxLayout >
                </TabContentItem>
            </Tabs>
            <GridLayout row="1" col="0" columns="2*,3*,2*">
                <Button col="0" class="-outline no-bg-button" @tap="skip" :text="'buttons.skip'|L" />
                <FlexboxLayout col="1" flexDirection="row" justifyContent="center" alignItems="center">
                    <Label v-for="(page, index) in pages" :class="`dot ${index <= currentPage ? 'dot-active' : ''}`" />
                </FlexboxLayout>
                <Button col="2" class="-outline no-bg-button" @tap="nextPage" :text="'buttons.next'|L" />
            </GridLayout>
        </GridLayout>
    </Page>
</template>

<script lang="ts">
    import TOS from '@/components/pages/TOS.vue'

    export default {
        name: "Intro",
        data() {
            return {
                currentPage: 0,
                pages: [
                    {
                        key: '_1',
                        image: 'res://test'
                    },
                    {
                        key: '_2',
                        image: 'res://test'
                    },
                    {
                        key: '_3',
                        image: 'res://test'
                    }
                ],
                layout: {
                    mainXPadding: '64dp'
                }
            }
        },
        methods: {
            nextPage() {
                if (this.currentPage + 2 > this.pages.length) {
                    this.skip();
                    return;
                }
                this.currentPage++;
            },
            skip() {
                this.$navigateTo(TOS, {
                    clearHistory: true
                })
            },
            tabChanged(args) {
                this.currentPage = args.newIndex;
            }
        }
    }
</script>

<style scoped lang="scss">
    .title {
        text-transform: uppercase;
        text-align: center;
        $margin-y: 48dp;
        margin-top: $margin-y;
        margin-bottom: $margin-y;
    }

    .subtitle {
        text-align: center;
    }

    .no-bg-button {
        border-width: 0px;
        android-elevation: 0;
        text-transform: uppercase;
    }

    .m-tab-view-item {
        border-width: 0px;
        android-elevation: 0;
    }

    .bold-text {
        font-weight: bolder;
    }

    .dot {
        margin: 0 4dp;
        height: 25px;
        width: 25px;
        background-color: #bbb;
        border-radius: 50%;
    }

    .dot-active {
        background-color: #53c1ec;
    }
</style>