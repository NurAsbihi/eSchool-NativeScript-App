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
        <TextField hint="Name" v-model="name" />
        <TextField hint="Phone" v-model.number="phone" />
        <Button @tap="checkoutSubmit" text="Checkout" />
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
            },
            // checkout(event)   {
            //     this.$emit('checkoutSubmit', event.item);
            // },
            checkoutSubmit()    {
                    // Counts how many times duplicate ID's come up so I can filter them
                    // when putting the objects into MongoDB
                    const mp = new Map(this.cart.map(o => [o._id, {...o, count: 0}]));
                    for (const {_id} of this.cart) mp.get(_id).count++;
                    const result = Array.from(mp.values());

                    console.log(result)

                    // Targetting specific fields in array for order collection
                    let cartID = result.map(a=>({id: a._id}));
                    let cartName = result.map(b=>({name: b.name}));
                    let cartSpaces = result.map(c=>({spaces: c.count}));

                    let currentDate = new Date().toJSON();

                    // Creating an object to send to the database
                    const newOrder = {
                        customer_name: this.name,
                        customer_number: this.phone,
                        product_purchased: {
                            lesson_id: cartID,
                            lesson_name: cartName,
                            spaces_bought: cartSpaces,
                        },
                        date: currentDate
                    }

                    console.log(newOrder);

                    fetch('https://cw2-server.herokuapp.com/collection/orders', {
                        method: 'POST',
                        headers: {
                            'Content-Type' : 'application/json'
                        },
                        body: JSON.stringify(newOrder)
                    })
                    .then(response => response.json())
                    .then(responseJSON => {
                        console.log('Success:', responseJSON)
                        this.$emit('clearCart')
                    });
                    alert("Successfully Checked Out!");
            },
        }       
    }
</script>
