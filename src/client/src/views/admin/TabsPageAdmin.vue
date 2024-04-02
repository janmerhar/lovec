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
          tab="admin_druzine"
          @click="redirectTo('admin_druzine')"
          :class="selectedTabStyle('admin_druzine')"
        >
          <font-awesome-icon
            :icon="['fas', 'house-user']"
            size="2xl"
            fixed-width
          />
        </ion-tab-button>

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
          tab="tower-observation"
          @click.prevent="redirectTo('admin_zemljevid')"
          :class="selectedTabStyle('admin_zemljevid')"
        >
          <font-awesome-icon
            :icon="['fas', 'tower-observation']"
            size="2xl"
            fixed-width
          />
        </ion-tab-button>

        <!-- Uporabniki -->
        <ion-tab-button
          tab="admin_uporabniki"
          @click.prevent="redirectTo('admin_uporabniki')"
          :class="selectedTabStyle('admin_uporabniki')"
        >
          <font-awesome-icon
            :icon="['fas', 'magnifying-glass']"
            size="2xl"
            fixed-width
          />
        </ion-tab-button>

        <!-- Sistemske spremenljivke -->
        <ion-tab-button
          tab="admin_sistem"
          @click.prevent="redirectTo('admin_sistem')"
          :class="selectedTabStyle('admin_sistem')"
        >
          <font-awesome-icon :icon="['fas', 'gear']" size="2xl" fixed-width />
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
