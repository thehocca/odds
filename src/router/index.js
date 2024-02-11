import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from '../views/SignIn.vue'
import SignOut from '../views/SignOut.vue'
import Casino from '../views/Casino/Casino.vue'
import CasinoDetail from '../views/Casino/CasinoDetail.vue'
import Account from '../views/Account/Account.vue'
import Password from '../views/Account/Password.vue'
import History from '../views/Account/History.vue'
import Tickets from '../views/Account/Tickets.vue'
import TicketsDetail from '../views/Account/TicketsDetail.vue'
import SportCountry from '../views/Sport/SportCountry.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/sign-in',
            name: 'sign-in',
            component: SignIn
        },
        {
            path: '/sign-out',
            name: 'sign-out',
            component: SignOut
        },
        {
            path: '/casino',
            name: 'casino',
            component: Casino
        },
        {
            path: '/casino/:id',
            name: 'casino-id',
            component: CasinoDetail
        },
        {
            path: '/account',
            name: 'account',
            component: Account
        },
        {
            path: '/account/password',
            name: 'password',
            component: Password
        },
        {
            path: '/account/history',
            name: 'history',
            component: History
        },    
        {
            path: '/account/tickets',
            name: 'tickets',
            component: Tickets
        },   
        {
            path: '/account/tickets/detail/:id',
            name: 'tickets-id',
            component: TicketsDetail
        }, 
        {
            path: '/sport/:name',
            name: 'sport-name',
            component: SportCountry
        },   
        
    ]
})


router.beforeEach(function (to, from, next) { 
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100);
    next();
});

export default router
