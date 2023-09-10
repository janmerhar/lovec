<template>
  <ion-page>
    <ion-tabs>
      <!-- Top tool bar -->
      <toolbar-navigation></toolbar-navigation>
      <!-- Component view -->
      <ion-router-outlet></ion-router-outlet>
      <!-- Bootom tool bar -->
      <ion-tab-bar slot="bottom" :selected-tab="selectedTab">
        <ion-tab-button
          tab="pripravniki"
          @click="() => router.push({ name: 'pripravniki' })"
        >
          <font-awesome-icon icon="fa-solid fa-people-group" size="2x" />
          <ion-label>Pripravniki</ion-label>
        </ion-tab-button>

        <ion-tab-button
          tab="vplen"
          @click.prevent="
            () => {
              // select('vplen')
              router.push({ name: 'vplen' })
            }
          "
        >
          <font-awesome-icon icon="fa-solid fa-paw" size="2x" />
          <ion-label>Vplen</ion-label>
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

        <!-- 
          <ion-tab-button
          tab="revirji"
          @click.prevent="() => router.push({ name: 'revirji' })"
        >
          <font-awesome-icon icon="fa-solid fa-map-location-dot" size="2x" />
          <ion-label>Revirji</ion-label>
        </ion-tab-button> 
      -->
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
  useIonRouter,
} from "@ionic/vue"
import ToolbarNavigation from "@/components/ToolbarNavigation.vue"

import { defineComponent } from "vue"

export default defineComponent({
  components: {
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonLabel,
    IonPage,
    IonRouterOutlet,
    ToolbarNavigation,
  },
  setup() {
    const router = useIonRouter()
    return { router }
  },
  data() {
    return {
      // TODO
      // Tab highlits do not work inside Vue.js
      // https://www.youtube.com/watch?v=DSx9WkaVCo8
      selectedTab: "opazovalnica",
    }
  },
  methods: {
    // Implementiraj tako, da bo
    clickOnTab(tab) {
      console.log(tab)
    },
  },
})
</script>
