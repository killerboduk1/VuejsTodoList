
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: '/',
    name: "Home",
    component: () => import("../components/Todo.vue")
   },
   {
    path: '/about',
    name: "About",
    component: () => import("../components/About.vue")
   },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
