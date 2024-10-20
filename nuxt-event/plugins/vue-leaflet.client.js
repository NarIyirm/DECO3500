// plugins/vue-leaflet.client.js
import { defineNuxtPlugin } from '#app';
import * as VueLeaflet from '@vue-leaflet/vue-leaflet';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('l-map', VueLeaflet.LMap);
    nuxtApp.vueApp.component('l-tile-layer', VueLeaflet.LTileLayer);
    nuxtApp.vueApp.component('l-marker', VueLeaflet.LMarker);
    // 其他组件按需注册...
});
