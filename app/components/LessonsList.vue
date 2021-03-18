<template>
    <StackLayout>
        <Label class="h2 text-center" text="Lessons" />
        <Label class="h2 text-center" text="Tap a product to add it to the cart" />
        <ListView for='lesson in lessons' @itemTap='onItemTap'>
            <v-template>
                <StackLayout>
                    <Label :text='lesson.image' />
                    <Label :text='lesson.name' />
                    <Label :text='lesson.location' />
                    <Label :text="`£${lesson.price}`" />
                    <Label :text="`Available: ${lesson.spaces}`" />
                </StackLayout>
            </v-template>
        </ListView>
    </StackLayout>
</template>


<script>
    export default  {
        data() {
            return  {
                lessons: {}
            };
        },
        methods:    {
            onItemTap(event)    {
                this.$emit('addLesson', event.item);
                alert(event.item.name)
            },
            
        },
        created: function() {
            fetch('https://cw2-server.herokuapp.com/collection/products', {
                method: 'GET',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify()
            })
            .then(response => response.json())
            .then((data) =>    {
                this.lessons = data;
            })
        },
    }
</script>
