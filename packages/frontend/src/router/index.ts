import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import BeanCountConfig from "../views/BeanCountConfig.vue";
import Statistics from "../views/Statistics.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: Statistics,
  },
  {
    path: "/beancount-config",
    name: "BeanCountConfig",
    component: BeanCountConfig,
  },
  {
    path: "/statistics",
    name: "Statistics",
    component: Statistics,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
