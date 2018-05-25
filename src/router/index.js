/**
 * Created by yzdd on 2018/5/25.
 */
import Vue from 'vue'
import Router from 'vue-router'
// import Bar from '../pages/Bar';
// import Foo from '../pages/Foo';
const Foo = () => import('../pages/Foo')
const Bar = () => import('../pages/Bar')
const List = () => import('../pages/List')
const Home = () => import('../pages/Home')

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: "/", component: Home
      },
      {
        path: "/list", component: List
      },
      {
        path: "/bar", component: Bar
      },
      {
        path: "/foo", component: Foo
      }
    ]
  })
}