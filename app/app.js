import Vue from 'nativescript-vue';

import eSchool from './components/App';

// Uncommment the following to see NativeScript-Vue output logs
// Vue.config.silent = false;

new Vue({

    template: `
        <Frame>
            <eSchool />
        </Frame>`,

    components: {
        eSchool
    }
}).$start();