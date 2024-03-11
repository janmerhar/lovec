import { createRouter, createWebHistory } from "@ionic/vue-router"
import { RouteRecordRaw } from "vue-router"
import TabsPage from "../views/TabsPage.vue"

// Tab paths
import TabJage from "../views/TabJage.vue"
import TabRevirji from "../views/TabRevirji.vue"
import TabOpazovalnica from "@/views/TabOpazovalnica.vue"
import TabOprema from "@/views/TabOprema.vue"
import TabIzkaznica from "@/views/TabIzkaznica.vue"
import TabPripravniki from "@/views/TabPripravniki.vue"
import TabVplen from "@/views/TabVplen.vue"
import TabLogin from "@/views/TabLogin.vue"
import TabMentor from "@/views/TabMentor.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: { name: "login" },
  },
  {
    path: "/login",
    name: "login",
    component: TabLogin,
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
        component: TabPripravniki,
      },
      {
        path: "mentor",
        name: "mentor",
        component: TabMentor,
      },
      {
        path: "vplen",
        name: "vplen",
        component: TabVplen,
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
  { path: "/:pathMatch(.*)*", redirect: { name: "login" } },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
