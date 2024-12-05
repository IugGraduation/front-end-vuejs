import { defineNuxtModule, addVitePlugin } from '@nuxt/kit';
import { svg4VuePlugin } from 'vite-plugin-svg4vue';

export default defineNuxtModule({
  meta: {
    name: 'nuxt-svg-icons',
    configKey: 'nuxtSvgIcons',
  },
  defaults: {
    svg4vue: {
      assetsDirName: 'assets/icons', // Directory for your SVG icons
    },
  },
  setup(options) {
    addVitePlugin(svg4VuePlugin(options.svg4vue));
  },
});
