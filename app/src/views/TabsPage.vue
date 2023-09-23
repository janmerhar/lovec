<template>
  <ion-page>
    <ion-tabs>
      <!-- Top tool bar -->
      <toolbar-navigation></toolbar-navigation>
      <!-- Component view -->
      <ion-router-outlet></ion-router-outlet>
      <!-- Bootom tool bar -->
      <ion-tab-bar slot="bottom">
        <ion-tab-button
          tab="jage"
          :class="{ 'active-tab': selectedTab === 'jage' }"
          @click="clickOnTab('jage')"
        >
          <font-awesome-icon icon="fa-solid fa-people-group" size="2x" />
          <ion-label>Jage</ion-label>
        </ion-tab-button>

        <ion-tab-button
          tab="pripravniki"
          @click="clickOnTab('pripravniki')"
          :class="{ 'active-tab': selectedTab === 'pripravniki' }"
        >
          <font-awesome-icon icon="fa-solid fa-address-book" size="2x" />
          <ion-label>Dnevniki</ion-label>
        </ion-tab-button>

        <ion-tab-button
          tab="vplen"
          @click.prevent="clickOnTab('vplen')"
          :class="{ 'active-tab': selectedTab === 'vplen' }"
        >
          <font-awesome-icon icon="fa-solid fa-paw" size="2x" />
          <ion-label>Vplen</ion-label>
        </ion-tab-button>

        <ion-tab-button
          tab="opazovalnica"
          @click.prevent="clickOnTab('opazovalnica')"
          :class="{ 'active-tab': selectedTab === 'opazovalnica' }"
        >
          <font-awesome-icon icon="fa-solid fa-tower-observation" size="2x" />
          <ion-label>Opazovalnice</ion-label>
        </ion-tab-button>

        <ion-tab-button
          tab="oprema"
          @click.prevent="clickOnTab('oprema')"
          :class="{ 'active-tab': selectedTab === 'oprema' }"
        >
          <font-awesome-icon icon="fa-solid fa-person-rifle" size="2x" />
          <ion-label>Oprema</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
      <!-- End bottom tool bar -->
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
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
      selectedTab: "oprema",
    }
  },
  methods: {
    clickOnTab(tabName: string) {
      this.selectedTab = tabName

      this.router.push({ name: tabName })
    },
  },
})
</script>

<style scoped>
.active-tab {
  color: var(--color-selected);
}


</style>
