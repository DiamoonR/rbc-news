import Vue from "vue";
import Vuetify from "vuetify/lib";
import { preset } from "vue-cli-plugin-vuetify-preset-reply/preset";
import ru from "vuetify/es5/locale/ru";
Vue.use(Vuetify);

export default new Vuetify({
  preset,
  rtl: true,
  theme: { dark: true },
  lang: {
    locales: { ru },
    current: "ru"
  }
});
