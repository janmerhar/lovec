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
  //
  // Admin routes
  //
  {
    // mogoce preimenujem tabs v user ali pa uporabnik
    path: "/user/",
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
  //
  // Admin routes
  //
  {
    path: "/admin",
    name: "admin",
    component: () => import("@/views/admin/TabsPageAdmin.vue"),
    redirect: { name: "oprema" },
    children: [
      {
        path: "druzine",
        name: "admin_druzine",
        component: async () => import("@/views/admin/TabAdminDruzine.vue"),
      },
      {
        path: "jage",
        name: "admin_jage",
        component: async () => import("@/views/admin/TabAdminJage.vue"),
      },
      {
        path: "sistem",
        name: "admin_sistem",
        component: async () => import("@/views/admin/TabAdminSistem.vue"),
      },
      {
        path: "uporabniki",
        name: "admin_uporabniki",
        component: async () => import("@/views/admin/TabAdminUporabniki.vue"),
      },
      {
        path: "oprema",
        name: "admin_oprema",
        component: async () =>
          import("@/views/admin/TabAdminUporabnikOprema.vue"),
      },
      {
        path: "profil",
        name: "admin_profil",
        component: async () =>
          import("@/views/admin/TabAdminUporabnikProfil.vue"),
      },
      {
        path: "vpleni",
        name: "admin_vpleni",
        component: async () =>
          import("@/views/admin/TabAdminUporabnikVpleni.vue"),
      },
      // Zemljevid
      {
        path: "zemljevid",
        name: "admin_zemljevid",
        component: async () => import("@/views/admin/TabAdminZemljevid.vue"),
      },
      {
        path: "zemljevid/opazovalnice",
        name: "admin_opazovalnice",
        component: async () => import("@/views/admin/TabAdminOpazovalnice.vue"),
      },
      {
        path: "zemljevid/revirji",
        name: "admin_revirji",
        component: async () => import("@/views/admin/TabAdminRevirji.vue"),
      },
    ],
  },
  //
  // Page not found
  //
  { path: "/:pathMatch(.*)*", redirect: { name: "login" } },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
