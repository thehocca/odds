// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { initYandexMetrika } from 'yandex-metrika-vue3';

const app = createApp(App)

app.use(initYandexMetrika, {
    id: 96605371,
    router: router,
    env: process.env.NODE_ENV
    // other options
})


app.use(router)

app.mount('#app')


import '../public/css/all.min.css'
import '../public/css/animate.css'
import '../public/css/bootstrap.min.css'
// import '../public/css/magnific-popup.css'
import '../public/css/nice-select.css'
import '../public/glyphter-font/css/Glyphter.css'
// import '../public/css/owl.carousel.min.css'
// import '../public/css/owl.theme.default.css'
import '../public/css/main.css'
import '../public/css/app.css'


import '../public/js/socket.io.js'
// import '../public/js/wow.min.js'
import '../public/js/jquery-3.6.0.min.js'
import '../public/js/bootstrap.bundle.min.js'
// import '../public/js/jquery.magnific-popup.min.js'
// import '../public/js/owl.carousel.min.js'
import '../public/js/jquery.nice-select.min.js'
import '../public/js/jquery-ui.min.js'
import '../public/js/api.js'
import '../public/js/main.js'
import '../public/js/app.js'
// import '../public/js/SoccerJersey.js'

