<template>
    <Page>
        <ActionBar title="eSchool - Courses Shop"/>
        <Label text="Welcome to the eSchool Courses Shop" class="h2 text-center" />
        <TabView androidTabsPosition='bottom'>
            <TabViewItem title="Lessons" class='h2'>
                <StackLayout>
                    <Label text="Lessons" />
                    <Lesson/>
                </StackLayout>
            </TabViewItem>
            <TabViewItem title="Checkout" class='h2'>
                <Label text="Checkout" />
            </TabViewItem>
        </TabView>
    </Page>
</template>

<script>
    import Lesson from './LessonsList';

    export default {
        components:    { Lesson },
        data () {
            return  {
            };
        },
    };
</script>

<!--<style scoped>
.home-panel {
    vertical-align: center;
    font-size: 20;
    margin: 15;
}

.description-label {
    margin-bottom: 15;
}
</style>-->
