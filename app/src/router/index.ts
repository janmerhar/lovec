import { createRouter, createWebHistory } from "@ionic/vue-router"
import { RouteRecordRaw } from "vue-router"
import TabsPage from "../views/TabsPage.vue"

// Tab paths
import TabJage from "../views/TabJage.vue"
import TabRevirji from "../views/TabRevirji.vue"
import TabOpazovalnica from "@/views/TabOpazovalnica.vue"
import TabOprema from "@/views/TabOprema.vue"
import TabIzkaznica from "@/views/TabIzkaznica.vue"
import SubTabPripravniki from "@/views/belezke/SubTabPripravniki.vue"
import SubTabVplen from "@/views/belezke/SubTabVplen.vue"
import LoginPage from "@/views/LoginPage.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: { name: "jage" },
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/tabs/",
    name: "tabs",
    component: TabsPage,
    redirect: { name: "oprema" },
    children: [
      {
        path: "jage",
        name: "jage",
        component: TabJage,
      },
      {
        path: "revirji",
        name: "revirji",
        component: TabRevirji,
      },
      {
        path: "pripravniki",
        name: "pripravniki",
        component: SubTabPripravniki,
      },
      {
        path: "vplen",
        name: "vplen",
        component: SubTabVplen,
      },
      {
        path: "opazovalnica",
        name: "opazovalnica",
        component: TabOpazovalnica,
      },
      {
        path: "oprema",
        name: "oprema",
        component: TabOprema,
      },
      {
        path: "izkaznica",
        name: "izkaznica",
        component: TabIzkaznica,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
