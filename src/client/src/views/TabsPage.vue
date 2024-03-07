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
          :class="selectedTabStyle('jage')"
          @click="clickOnTab('jage')"
        >
          <font-awesome-icon
            :icon="['fas', 'people-group']"
            size="2xl"
            fixed-width
          />
        </ion-tab-button>

        <ion-tab-button
          tab="pripravniki"
          @click="clickOnTab('pripravniki')"
          :class="selectedTabStyle('pripravniki')"
        >
          <font-awesome-icon
            :icon="['fas', 'address-book']"
            size="2xl"
            fixed-width
          />
        </ion-tab-button>

        <ion-tab-button
          tab="opazovalnica"
          @click.prevent="clickOnTab('opazovalnica')"
          :class="selectedTabStyle('opazovalnica')"
        >
          <font-awesome-icon
            :icon="['fas', 'tower-observation']"
            size="2xl"
            fixed-width
          />
        </ion-tab-button>

        <ion-tab-button
          tab="oprema"
          @click.prevent="clickOnTab('oprema')"
          :class="selectedTabStyle('oprema')"
        >
          <font-awesome-icon
            :icon="['fas', 'person-rifle']"
            size="2xl"
            fixed-width
          />
        </ion-tab-button>

        <ion-tab-button
          tab="vplen"
          @click.prevent="clickOnTab('vplen')"
          :class="selectedTabStyle('vplen')"
        >
          <font-awesome-icon :icon="['fas', 'paw']" size="2xl" fixed-width />
        </ion-tab-button>
      </ion-tab-bar>
      <!-- End bottom tool bar -->
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonPage,
  IonRouterOutlet,
  useIonRouter,
} from "@ionic/vue"
import ToolbarNavigation from "@/components/ToolbarNavigation.vue"

import { computed } from "vue"
import { useRoute } from "vue-router"

// TODO: naredi composable
const router = useIonRouter()
const route = useRoute()

const selectedTab = computed(() => {
  return route.name
})

const selectedTabStyle = (selectedValue: string) => {
  return {
    "active-tab":
      typeof selectedTab.value == "string" &&
      selectedTab.value === selectedValue,
  }
}

const clickOnTab = (tabName: string) => {
  router.push({ name: tabName })
}
</script>

<style scoped>
@media (min-width: 1200px) {
  ion-router-outlet {
    margin-left: 20vw;
    margin-right: 20vw;
  }
}
</style>
