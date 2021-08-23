import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import before from './beforeeach'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(before)
export default router
