export default [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/Home.vue'),
    },
    {
        path: '/about',
        name: 'about-us',
        component: () => import('@/views/About.vue'),
    },
    {
        path: '/visualisation',
        name: 'visualisation',
        component: () => import('@/views/Visualisation.vue'),
    }
]