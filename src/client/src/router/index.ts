import { createRouter, createWebHistory } from "@ionic/vue-router"
import {
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw,
} from "vue-router"

import TabsPage from "@/views/TabsPage.vue"

// Tab paths
import TabJage from "@/views/TabJage.vue"
import TabRevirji from "@/views/TabRevirji.vue"
import TabOpazovalnica from "@/views/TabOpazovalnica.vue"
import TabOprema from "@/views/TabOprema.vue"
import TabIzkaznica from "@/views/TabIzkaznica.vue"
import TabPripravniki from "@/views/TabPripravniki.vue"
import TabVplen from "@/views/TabVplen.vue"
import SubTabVplenDatum from "@/views/SubTabVplenDatum.vue"
import TabLogin from "@/views/TabLogin.vue"
import TabMentor from "@/views/TabMentor.vue"

import { storeToRefs } from "pinia"
import { useLoginStore } from "@/stores/useLoginStore"

const checkRole = (role: string) => {
  const { isPripravnik, isLovec, isAdmin } = storeToRefs(useLoginStore())

  if (role === "pripravnik" && isPripravnik.value) {
    return true
  }

  if (role === "lovec" && isLovec.value) {
    return true
  }

  if (role === "admin" && isAdmin.value) {
    return true
  }
}

const allowIsRole = (roles: string[], redirect?: string) => {
  return (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const isAllowed = roles.some((role) => checkRole(role))

    if (isAllowed) {
      next()
    } else if (redirect) {
      next({ name: redirect })
    }
  }
}
const allowIsNotRole = (roles: string[], redirect?: string) => {
  return (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const isAllowed = roles.every((role) => !checkRole(role))

    if (isAllowed) {
      next()
    } else if (redirect) {
      next({ name: redirect })
    }
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: { name: "oprema" },
  },
  {
    path: "/login",
    name: "login",
    component: TabLogin,
    beforeEnter: allowIsNotRole(["pripravnik", "lovec", "admin"], "oprema"),
  },
  //
  // User routes
  //
  {
    // mogoce preimenujem tabs v user ali pa uporabnik
    path: "/user/",
    name: "tabs",
    component: TabsPage,
    redirect: { name: "oprema" },
    beforeEnter: allowIsRole(["pripravnik", "lovec"], "login"),
    children: [
      {
        path: "jage",
        name: "jage",
        component: TabJage,
        beforeEnter: allowIsRole(["pripravnik", "lovec"]),
      },
      {
        path: "revirji",
        name: "revirji",
        component: TabRevirji,
        beforeEnter: allowIsRole(["pripravnik", "lovec"]),
      },
      {
        path: "pripravniki",
        name: "pripravniki",
        component: TabPripravniki,
        beforeEnter: allowIsRole(["pripravnik"], "mentor"),
      },
      {
        path: "mentor",
        name: "mentor",
        component: TabMentor,
        beforeEnter: allowIsRole(["lovec"], "pripravniki"),
      },
      {
        path: "vplen",
        name: "vplen",
        component: TabVplen,
        beforeEnter: allowIsRole(["pripravnik", "lovec"]),
      },
      {
        path: "vplen/:id",
        name: "vplen_id",
        component: SubTabVplenDatum,
        beforeEnter: allowIsRole(["pripravnik", "lovec"]),
      },
      // mogoce naredim sub-tab
      // ker bom prikazoval tudi card modale cez kot zemljevid i guess
      // TODO: naredi subtab
      {
        path: "opazovalnica",
        name: "opazovalnica",
        component: TabOpazovalnica,
        beforeEnter: allowIsRole(["pripravnik", "lovec"]),
      },
      {
        path: "oprema",
        name: "oprema",
        component: TabOprema,
        beforeEnter: allowIsRole(["pripravnik", "lovec"]),
      },
      {
        path: "izkaznica/:id?",
        name: "izkaznica",
        component: TabIzkaznica,
        beforeEnter: allowIsRole(["pripravnik", "lovec"]),
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
    beforeEnter: allowIsRole(["admin"]),
    children: [
      {
        path: "druzine",
        name: "admin_druzine",
        component: async () => import("@/views/admin/TabAdminDruzine.vue"),
        beforeEnter: allowIsRole(["admin"]),
      },
      {
        path: "jage",
        name: "admin_jage",
        component: async () => import("@/views/admin/TabAdminJage.vue"),
        beforeEnter: allowIsRole(["admin"]),
      },
      // TODO: jage description
      {
        path: "sistem",
        name: "admin_sistem",
        component: async () => import("@/views/admin/TabAdminSistem.vue"),
        beforeEnter: allowIsRole(["admin"]),
      },
      {
        path: "uporabniki",
        name: "admin_uporabniki",
        component: async () => import("@/views/admin/TabAdminUporabniki.vue"),
        beforeEnter: allowIsRole(["admin"]),
      },
      {
        path: "oprema",
        name: "admin_oprema",
        component: async () =>
          import("@/views/admin/TabAdminUporabnikOprema.vue"),
        beforeEnter: allowIsRole(["admin"]),
      },
      {
        path: "profil",
        name: "admin_profil",
        component: async () =>
          import("@/views/admin/TabAdminUporabnikProfil.vue"),
        beforeEnter: allowIsRole(["admin"]),
      },
      {
        path: "vpleni",
        name: "admin_vpleni",
        component: async () =>
          import("@/views/admin/TabAdminUporabnikVpleni.vue"),
        beforeEnter: allowIsRole(["admin"]),
      },
      // Zemljevid
      {
        path: "zemljevid",
        name: "admin_zemljevid",
        component: async () => import("@/views/admin/TabAdminZemljevid.vue"),
        beforeEnter: allowIsRole(["admin"]),
      },
      {
        path: "zemljevid/opazovalnice",
        name: "admin_opazovalnice",
        component: async () => import("@/views/admin/TabAdminOpazovalnice.vue"),
        beforeEnter: allowIsRole(["admin"]),
      },
      {
        path: "zemljevid/revirji",
        name: "admin_revirji",
        component: async () => import("@/views/admin/TabAdminRevirji.vue"),
        beforeEnter: allowIsRole(["admin"]),
      },
    ],
  },
  //
  // Page not found TODO: update to 404 page
  //
  { path: "/:pathMatch(.*)*", redirect: { name: "login" } },
  // TODO: no permissions page
  // TODO: naredi se check ce je uporabnik logged in
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
