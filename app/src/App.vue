<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from "@ionic/vue"

import { defineComponent } from "vue"

import { useUporabnikStore } from "@/stores/useUporabnikStore"

export default defineComponent({
  components: {
    IonApp,
    IonRouterOutlet,
  },
  methods: {
    setBearer() {
      // Reading JWT token from Pinia store on reload
      const uporabnikStore = useUporabnikStore()

      this.axios.defaults.headers.Authorization = `Bearer ${uporabnikStore.token}`
      console.log("Token: ", this.axios.defaults.headers.Authorization)
    },
  },
  async beforeMount() {
    this.setBearer()
  },
})
</script>
