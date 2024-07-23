import { createRouter, createWebHistory } from "@ionic/vue-router"
import {
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw,
} from "vue-router"

import TabsPage from "@/views/TabsPage.vue"

// Tab paths
import TabJage from "@/views/TabJage.vue"
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
import type { Role } from "@/types"

interface RoleReditect {
  pripravnik?: string
  lovec?: string
  admin?: string
}

const getRoleString = (): Role | null => {
  const { isPripravnik, isLovec, isAdmin } = storeToRefs(useLoginStore())

  if (isPripravnik.value) {
    return "pripravnik"
  }

  if (isLovec.value) {
    return "lovec"
  }

  if (isAdmin.value) {
    return "admin"
  }

  return null
}
const checkRole = (role: Role) => {
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

const allowIsRole = (roles: Role[], redirect?: RoleReditect) => {
  return (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const isAllowed = roles.some((role) => checkRole(role))
    const roleString = getRoleString()

    if (isAllowed) {
      next()
    } else if (redirect && roleString && redirect[roleString]) {
      next({ name: redirect[roleString] })
    } else {
      next({ name: "login" })
    }
  }
}
const allowIsNotRole = (roles: Role[], redirect?: RoleReditect) => {
  return (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const isAllowed = roles.every((role) => !checkRole(role))

    const roleString = getRoleString()

    if (isAllowed) {
      next()
    } else if (redirect && roleString && redirect[roleString]) {
      next({ name: redirect[roleString] })
    } else {
      next({ name: "login" })
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
    beforeEnter: allowIsNotRole(["pripravnik", "lovec", "admin"], {
      admin: "admin_druzine",
      pripravnik: "oprema",
      lovec: "oprema",
    }),
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
    beforeEnter: allowIsRole(["pripravnik", "lovec"], {
      admin: "admin_druzine",
    }),
    children: [
      {
        path: "jage",
        name: "jage",
        component: TabJage,
        beforeEnter: allowIsRole(["pripravnik", "lovec"]),
      },
      // TODO: ogled jag za nekega specificnega uporabnika
      // TODO: jage description
      {
        path: "jage/:id",
        name: "jage_id",
        component: TabJage,
        beforeEnter: allowIsRole(["pripravnik", "lovec"]),
      },
      {
        path: "pripravniki",
        name: "pripravniki",
        component: TabPripravniki,
        beforeEnter: allowIsRole(["pripravnik"]),
      },
      {
        path: "mentor",
        name: "mentor",
        component: TabMentor,
        beforeEnter: allowIsRole(["lovec"]),
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
        path: "opazovalnice",
        name: "opazovalnice",
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
        beforeEnter: allowIsRole(["pripravnik", "lovec", "admin"]),
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
    redirect: { name: "druzine" },
    beforeEnter: allowIsRole(["admin"], {
      pripravnik: "oprema",
      lovec: "oprema",
    }),
    children: [
      {
        path: "izkaznica",
        name: "admin_izkaznica",
        component: TabIzkaznica,
        beforeEnter: allowIsRole(["pripravnik", "lovec", "admin"]),
      },
      {
        path: "druzine",
        name: "admin_druzine",
        component: () => import("@/views/admin/TabAdminDruzine.vue"),
        beforeEnter: allowIsRole(["admin"]),
      },
      {
        path: "druzina/:id?",
        name: "admin_druzina_id",
        component: () => import("@/views/admin/SubTabAdminDruzina.vue"),
        beforeEnter: allowIsRole(["admin"]),
      },
      {
        path: "jage",
        name: "admin_jage",
        component: () => import("@/views/admin/TabAdminJage.vue"),
        beforeEnter: allowIsRole(["admin"]),
      },
      // TODO: jage description
      {
        path: "sistem",
        name: "admin_sistem",
        component: () => import("@/views/admin/TabAdminSistem.vue"),
        beforeEnter: allowIsRole(["admin"]),
      },
      // Uporabniki search
      {
        path: "uporabniki",
        name: "admin_uporabniki",
        component: () => import("@/views/admin/TabAdminUporabniki.vue"),
        beforeEnter: allowIsRole(["admin"]),
      },
      // Uporabnik profil
      {
        path: "admin_uporabnik/:id?",
        name: "admin_uporabnik_id",
        component: () => import("@/views/admin/TabAdminUporabnikProfil.vue"),
        beforeEnter: allowIsRole(["admin"]),
      },
      //
      // Uporabnik pages
      //
      {
        path: "uporabnik/oprema",
        name: "admin_uporabnik_oprema",
        component: () => import("@/views/admin/TabAdminUporabnikOprema.vue"),
        beforeEnter: allowIsRole(["admin"]),
      },
      {
        path: "uporabnik/pripravnik/dnevniki",
        name: "admin_pripravnik_dnevniki",
        component: () => import("@/views/admin/TabAdminPripravnikDnevniki.vue"),
        beforeEnter: allowIsRole(["admin"]),
      },
      {
        path: "uporabnik/mentor/dnevniki",
        name: "admin_mentor_dnevniki",
        component: () => import("@/views/admin/TabAdminMentorDnevniki.vue"),
        beforeEnter: allowIsRole(["admin"]),
      },
      {
        path: "uporabnik/vpleni",
        name: "admin_uporabnik_vpleni",
        component: () => import("@/views/admin/TabAdminUporabnikVpleni.vue"),
        beforeEnter: allowIsRole(["admin"]),
      },
      {
        path: "uporabnik/jage",
        name: "admin_uporabnik_jage",
        component: () => import("@/views/admin/TabAdminUporabnikJage.vue"),
        beforeEnter: allowIsRole(["admin"]),
      },
      {
        path: "uporabnik/obiski",
        name: "admin_uporabnik_obiski",
        component: () => import("@/views/admin/TabAdminUporabnikObiski.vue"),
        beforeEnter: allowIsRole(["admin"]),
      },
      // TODO: vpleniDetails/:id
      // Zemljevid
      {
        path: "zemljevid",
        name: "admin_zemljevid",
        component: () => import("@/views/admin/TabAdminZemljevid.vue"),
        beforeEnter: allowIsRole(["admin"]),
      },
      {
        path: "zemljevid/obiski",
        name: "admin_zemljevid_obiski",
        component: () => import("@/views/admin/SubTabAdminObiski.vue"),
        beforeEnter: allowIsRole(["admin"]),
      },
      // TODO: vaju dva lahko zdruzim skupaj
      {
        path: "zemljevid/opazovalnice",
        name: "admin_opazovalnice",
        component: () => import("@/views/admin/TabAdminOpazovalnice.vue"),
        beforeEnter: allowIsRole(["admin"]),
      },
      {
        path: "zemljevid/revirji",
        name: "admin_revirji",
        component: () => import("@/views/admin/TabAdminRevirji.vue"),
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
