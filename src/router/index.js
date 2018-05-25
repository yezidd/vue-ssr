/**
 * Created by yzdd on 2018/5/25.
 */
import Vue from 'vue'
import Router from 'vue-router'
import Bar from '../pages/Bar';
import Foo from '../pages/Foo';

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: "/bar", component: Bar
      },
      {
        path: "/foo", component: Foo
      }
    ]
  })
}