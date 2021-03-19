<template>
    <Page>
        <ActionBar title="eSchool - Courses Shop"/>
        <Label text="Welcome to the eSchool Courses Shop" class="h2 text-center" />
        <TabView androidTabsPosition='bottom'>
            <TabViewItem title="Lessons" class='h2'>
                <Lesson @addLesson="addToCart"/>
            </TabViewItem>
            <TabViewItem title="Checkout" class='h2'>
                <StackLayout>
                    <Checkout :cart='cart' @removeItem="removeLesson" @clearCart="refreshCart"/>
                </StackLayout>
            </TabViewItem>
        </TabView>
    </Page>
</template>

<script>
    import Lesson from './LessonsList';
    import Checkout from './Checkout';

    export default {
        components:    { Lesson, Checkout },
        data () {
            return  {
                cart: [],
            };
        },
        methods:    {
            addToCart(lesson)  {
                if (lesson.spaces > 0)    {
                    lesson.spaces -= 1;
                    this.cart.push(lesson);

                    let updateProduct = {spaces: lesson.spaces};

                    fetch('https://cw2-server.herokuapp.com/collection/products/' + lesson._id, {
                        method: 'PUT',
                        headers: {
                            'Content-Type' : 'application/json'
                        },
                        body: JSON.stringify(updateProduct)
                    })
                    .then(response => response.json())
                    .then(data => {
                        alert(lesson.name + ' added to cart')
                        console.log('Successfully updated spaces:', data)
                    })                    
                }
                else {
                    alert("No more courses available!")
                }
            },
            removeLesson(lesson)  {
                if (lesson.spaces < 10)  {
                    lesson.spaces += 1;
                    this.cart.splice(this.cart.indexOf(lesson), 1);
                    
                    let updateProduct = {spaces: lesson.spaces};

                    fetch('https://cw2-server.herokuapp.com/collection/products/' + lesson._id, {
                        method: 'PUT',
                        headers: {
                            'Content-Type' : 'application/json'
                        },
                        body: JSON.stringify(updateProduct)
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Successfully updated spaces:', data)
                    })
                }
            },
            refreshCart (clearCart) {
                alert("It's working")
                this.$data.cart = [];
            }
        }
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
