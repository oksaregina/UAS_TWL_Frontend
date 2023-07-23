export default [
    {
        name: 'Master',
        path: '/',
        component: () => import('../pages/layout/master'),
        children: [
            {
                name:'Mahasiswa',
                path: '/Mahasiswa',
                component: () => import('../pages/Mahasiswa'),
            },
            {
                name:'Home',
                path: '/Home',
                component: () => import('../pages/Home'),
            },
        ]
    },
]
