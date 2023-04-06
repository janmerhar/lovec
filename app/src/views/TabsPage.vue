<template>
  <ion-page>
    <ion-tabs>
      <!-- Top tool bar -->
      <app-toolbar></app-toolbar>
      <!-- Component view -->
      <ion-router-outlet></ion-router-outlet>
      <!-- Bootom tool bar -->
      <ion-tab-bar slot="bottom" :selected-tab="selectedTab">
        <ion-tab-button tab="jage" @click="() => router.push({ name: 'jage' })">
          <font-awesome-icon icon="fa-solid fa-people-group" size="2x" />
          <ion-label>Jage</ion-label>
        </ion-tab-button>

        <ion-tab-button
          tab="belezke"
          @click.prevent="() => router.push({ name: 'belezke' })"
        >
          <font-awesome-icon icon="fa-solid fa-note-sticky" size="2x" />
          <ion-label>Beležke</ion-label>
        </ion-tab-button>

        <ion-tab-button
          tab="opazovalnica"
          @click.prevent="() => router.push({ name: 'opazovalnica' })"
        >
          <font-awesome-icon icon="fa-solid fa-tower-observation" size="2x" />
          <ion-label>Opazovalnice</ion-label>
        </ion-tab-button>

        <ion-tab-button
          tab="oprema"
          @click.prevent="() => router.push({ name: 'oprema' })"
        >
          <font-awesome-icon icon="fa-solid fa-person-rifle" size="2x" />
          <ion-label>Oprema</ion-label>
        </ion-tab-button>

        <ion-tab-button
          tab="revirji"
          @click.prevent="() => router.push({ name: 'revirji' })"
        >
          <font-awesome-icon icon="fa-solid fa-map-location-dot" size="2x" />
          <ion-label>Revirji</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
      <!-- End bottom tool bar -->
    </ion-tabs>
  </ion-page>
</template>

<script>
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonPage,
  IonRouterOutlet,
} from "@ionic/vue"
import AppToolbar from "@/components/AppToolbar.vue"

import { defineComponent } from "vue"
import { useRouter } from "vue-router"

export default defineComponent({
  components: {
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonLabel,
    IonPage,
    IonRouterOutlet,
    AppToolbar,
  },
  setup() {
    const router = useRouter()
    return { router }
  },
  data() {
    return {
      // Tab highlits do not work inside Vue.js
      selectedTab: "belezke",
    }
  },
})
</script>
