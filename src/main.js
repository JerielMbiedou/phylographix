import {createApp} from 'vue'
import App from './App.vue'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
//personal styles
import './assets/css/index.css'
// import { createPinia } from 'pinia'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import approutes from './utils/routes'
import {createRouter, createWebHistory} from 'vue-router'
import appStore from './stores/appStore.js'

import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css'; // Import the CSS for styling


// const pinia = createPinia()

const vuetify = createVuetify({
    components,
    directives,
})

// Ensure you are using css-loader


export default createVuetify({
    icons: {
        defaultSet: 'mdi', // This is already the default value - only for display purposes
    },
})

const router = createRouter({
    history: createWebHistory("/"),
    scrollBehavior() {
        return {
            x: 0,
            y: 0,
        }
    },
    routes: approutes
})


createApp(App)
    .use(vuetify)
    .use(appStore)
    .use(router)
    .use(Toast, {
        position: "top-right",
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
        rtl: false
    })
    // .use(pinia)
    .mount('#app')
