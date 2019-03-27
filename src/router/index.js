import Vue from 'vue'
import Router from 'vue-router'
import Cart from '../views/Cart'
import GoodsList from '../views/GoodsList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      components: {
        default: GoodsList
      }
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    }
  ]
})
