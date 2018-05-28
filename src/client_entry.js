/**
 * Created by yzdd on 2018/5/24.
 */
import {createApp} from './app'

const {app, router,store} = createApp()
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}
router.onReady(() => {
  app.$mount('#app')
});