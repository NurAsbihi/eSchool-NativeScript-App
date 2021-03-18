<template>
    <StackLayout>
        <Label class="h2 text-center" text="Shopping Cart" />
        <Label class="h2 text-center" text="Tap a product to remove it from the cart" />
        <ListView for="lesson in cart" @itemTap='onItemTap'>
            <v-template>
                <StackLayout>
                    <Label :text="lesson.name" />
                    <Label :text="`£${lesson.price}`" />
                </StackLayout>
            </v-template>
        </ListView>
    </StackLayout>
</template>

<script>
    export default {
        props: ['cart'],
        data() {
            return  {
                
            }
        },
        methods:    {
            onItemTap(event)    {
                this.$emit('removeItem', event.item);
                alert("Removed " + event.item.name + " from cart")
            }
        }       
    }
</script>
