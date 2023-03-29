import { createRouter, createWebHistory } from "@ionic/vue-router"
import { RouteRecordRaw } from "vue-router"
import TabsPage from "../views/TabsPage.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/tabs/tab1",
  },
  {
    path: "/tabs/",
    component: TabsPage,
    children: [
      {
        path: "",
        redirect: "/tabs/jage",
      },
      {
        path: "jage",
        component: () => import("@/views/TabJage.vue"),
      },
      {
        path: "revirji",
        component: () => import("@/views/Tab2Page.vue"),
      },
      {
        path: "belezke",
        component: () => import("@/views/Tab3Page.vue"),
      },
      {
        path: "opazovalnica",
        component: () => import("@/views/Tab4Page.vue"),
      },
      {
        path: "oprema",
        component: () => import("@/views/Tab5Page.vue"),
      },
      {
        path: "izkaznica",
        component: () => import("@/views/TabIzkaznica.vue"),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
