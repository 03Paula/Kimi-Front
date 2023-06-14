import { createRouter, createWebHistory } from 'vue-router'
import login from '@/components/login.vue'
import listado from '@/components/index.vue'
import contacto from '@/components/contacto.vue'
import usuario from '@/components/usuario.vue'
import producto from '@/components/producto.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'listado',
      component: listado
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/contacto',
      name: 'contacto',
      component: contacto
    },
    {
      path: '/usuario',
      name: 'usuario',
      component: usuario
    },
    {
      path: '/producto/:id',
      name: 'detalle-producto',
      component: producto
    }

  ]
})

export default router
