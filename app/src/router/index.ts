import { createRouter, createWebHistory } from "@ionic/vue-router"
import { RouteRecordRaw } from "vue-router"
import TabsPage from "../views/TabsPage.vue"

// Tab paths
import TabJage from "../views/TabJage.vue"
import TabRevirji from "../views/TabRevirji.vue"
import TabBelezke from "../views/TabBelezke.vue"
import TabOpazovalnica from "@/views/TabOpazovalnica.vue"
import TabOprema from "@/views/TabOprema.vue"
import TabIzkaznica from "@/views/TabIzkaznica.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: { name: "jage" },
  },
  {
    path: "/tabs/",
    name: "tabs",
    component: TabsPage,
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
        path: "belezke",
        name: "belezke",
        component: TabBelezke,
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
