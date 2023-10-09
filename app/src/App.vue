<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue"

import { defineComponent } from "vue"

import { useUporabnikStore } from "@/stores/uporabnikStore"

export default defineComponent({
  components: {
    IonApp,
    IonRouterOutlet,
  },
  methods: {
    // TODO
    // maybe dam vse te funkcije v pinia store
    setBearer() {
      // Reading JWT token from Pinia store on reload
      const uporabnikStore = useUporabnikStore()

      // TODO check if token is valid
      // or expired
      // and act accordingly
      this.axios.defaults.headers.Authorization = `Bearer ${uporabnikStore.token}`
      console.log("Token: ", this.axios.defaults.headers.Authorization)
    },
    checkBearerValidity() {
      // TODO
      // Check if token is valid
      // If not, redirect to login page
    },
  },
  async beforeMount() {
    this.setBearer()
  },
})
</script>
