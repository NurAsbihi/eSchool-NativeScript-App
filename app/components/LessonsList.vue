<template>
    <ListView for='lesson in lessons'>
        <v-template>
            <Label :text='lesson.name' />
        </v-template>
    </ListView>
</template>


<script>
    export default  {
        data() {
            return  {
                lessons: [ 
                    {name: "Hi"},
                    {name: "Hi2"},
                    {name: "Hi3"}
                ]
            };
        },
    }
</script>
