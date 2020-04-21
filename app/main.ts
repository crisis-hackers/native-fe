import Vue from 'nativescript-vue'
// @ts-ignore
// @ts-ignore
import Intro from './components/pages/Intro.vue'

import store from './store'
import VueDevtools from 'nativescript-vue-devtools'
import Theme from '@nativescript/theme'
import {localize} from 'nativescript-localize';

if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production');
// Prints Colored logs when --env.production is *NOT* set while building
// @ts-ignore
Vue.config.debug = (TNS_ENV !== 'production');

Theme.setMode(Theme.Light);

Vue.registerElement(
    'CheckBox',
    () => require('@nstudio/nativescript-checkbox').CheckBox,
    {
      model: {
        prop: 'checked',
        event: 'checkedChange'
      }
    }
);
Vue.registerElement("SVGImage", () => require("@teammaestro/nativescript-svg").SVGImage)

Vue.filter('L', localize);
Vue.filter('svg', function (value) {
    return `~/assets/svg/${value}.svg`
})

new Vue({
  store,
  render: h => h('frame', [h(Intro)])
}).$start();
