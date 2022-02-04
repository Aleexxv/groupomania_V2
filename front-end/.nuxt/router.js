import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _b3cc219c = () => interopDefault(import('..\\pages\\blogText\\index.vue' /* webpackChunkName: "pages/blogText/index" */))
const _a983c2cc = () => interopDefault(import('..\\pages\\blogVideo\\index.vue' /* webpackChunkName: "pages/blogVideo/index" */))
const _d27c40ac = () => interopDefault(import('..\\pages\\login\\index.vue' /* webpackChunkName: "pages/login/index" */))
const _d6021ef6 = () => interopDefault(import('..\\pages\\profil\\index.vue' /* webpackChunkName: "pages/profil/index" */))
const _70d606fb = () => interopDefault(import('..\\pages\\login\\admin\\index.vue' /* webpackChunkName: "pages/login/admin/index" */))
const _6b95e3fc = () => interopDefault(import('..\\pages\\profil\\updateProfil.vue' /* webpackChunkName: "pages/profil/updateProfil" */))
const _555e161a = () => interopDefault(import('..\\pages\\blogText\\_id.vue' /* webpackChunkName: "pages/blogText/_id" */))
const _51dd8ec1 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/blogText",
    component: _b3cc219c,
    name: "blogText"
  }, {
    path: "/blogVideo",
    component: _a983c2cc,
    name: "blogVideo"
  }, {
    path: "/login",
    component: _d27c40ac,
    name: "login"
  }, {
    path: "/profil",
    component: _d6021ef6,
    name: "profil"
  }, {
    path: "/login/admin",
    component: _70d606fb,
    name: "login-admin"
  }, {
    path: "/profil/updateProfil",
    component: _6b95e3fc,
    name: "profil-updateProfil"
  }, {
    path: "/blogText/:id",
    component: _555e161a,
    name: "blogText-id"
  }, {
    path: "/",
    component: _51dd8ec1,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
