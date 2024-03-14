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
          @click="redirectTo('jage')"
        >
          <font-awesome-icon
            :icon="['fas', 'people-group']"
            size="2xl"
            fixed-width
          />
        </ion-tab-button>

        <ion-tab-button
          tab="pripravniki"
          @click="redirectTo('pripravniki')"
          :class="selectedTabStyle('pripravniki')"
        >
          <font-awesome-icon
            :icon="['fas', 'people-group']"
            size="2xl"
            fixed-width
          />
        </ion-tab-button>

        <ion-tab-button
          tab="opazovalnica"
          @click.prevent="redirectTo('opazovalnica')"
          :class="selectedTabStyle('opazovalnica')"
        >
          <font-awesome-icon
            :icon="['fas', 'people-group']"
            size="2xl"
            fixed-width
          />
        </ion-tab-button>

        <ion-tab-button
          tab="oprema"
          @click.prevent="redirectTo('oprema')"
          :class="selectedTabStyle('oprema')"
        >
          <font-awesome-icon
            :icon="['fas', 'people-group']"
            size="2xl"
            fixed-width
          />
        </ion-tab-button>

        <ion-tab-button
          tab="vplen"
          @click.prevent="redirectTo('vplen')"
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
} from "@ionic/vue"
import ToolbarNavigation from "@/components/ToolbarNavigation.vue"

import { useTabNavigation } from "@/composables/useTabNavigation"

const { selectedTabStyle, redirectTo } = useTabNavigation()
</script>

<style scoped>
@media (min-width: 1200px) {
  ion-router-outlet {
    margin-left: 20vw;
    margin-right: 20vw;
  }
}
</style>
