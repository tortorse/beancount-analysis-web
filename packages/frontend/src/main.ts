import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { zhCN, enUS } from "./locales";

const i18n = createI18n({
  locale: navigator.language,
  legacy: false,
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS
  },
});


createApp(App).use(router).use(i18n).mount("#app");
