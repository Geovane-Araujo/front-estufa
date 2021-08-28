import Home from '../views/Home.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: { name: 'Detalhes', params: { name: 'Detalhes' } },
    children: [
      {
        path: '/detalhes',
        name: 'Detalhes',
        component: () => import('../views/Pages/Detalhes.vue')
      },
      {
        path: '/dashboard',
        name: 'DashBoard',
        component: () => import('../views/Pages/DashBoard.vue')
      },
      {
        path: '/plantas',
        name: 'Plantas',
        component: () => import('../views/Pages/Plantas.vue')
      },
      {
        path: '/nutrientes',
        name: 'Nutrientes',
        component: () => import('../views/Pages/Nutrientes.vue')
      },
      {
        path: '/fases',
        name: 'FasesCrecimento',
        component: () => import('../views/Pages/FasesCrecimento.vue')
      },
      {
        path: '/estufas',
        name: 'Estufas',
        component: () => import('../views/Pages/Estufas.vue')
      },
      {
        path: '/usuarios',
        name: 'Usuarios',
        component: () => import('../views/Pages/Usuarios.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../security/Login.vue')
  }
]
export default routes
