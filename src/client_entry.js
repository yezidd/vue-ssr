/**
 * Created by yzdd on 2018/5/24.
 */
import {createApp} from './app'

const {app, router} = createApp()

router.onReady(() => {
  app.$mount('#app')
});