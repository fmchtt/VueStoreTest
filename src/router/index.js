import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About')
  },
  {
    path: '/product/:id',
    name: 'Produto',
    component: () => import(/* webpackChunkName: "products" */ '../views/SingleProduct')
  }
]

const router = new VueRouter({
  routes
})

export default router
