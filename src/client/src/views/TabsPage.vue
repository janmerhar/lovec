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

        <template v-if="isPripravnik">
          <ion-tab-button
            tab="pripravniki"
            @click="redirectTo('pripravniki')"
            :class="selectedTabStyle('pripravniki')"
          >
            <font-awesome-icon
              :icon="['fas', 'address-book']"
              size="2xl"
              fixed-width
            />
          </ion-tab-button>
        </template>

        <template v-if="isLovec">
          <ion-tab-button
            tab="mentor"
            @click="redirectTo('mentor')"
            :class="selectedTabStyle('mentor')"
          >
            <font-awesome-icon
              :icon="['fas', 'address-book']"
              size="2xl"
              fixed-width
            />
          </ion-tab-button>
        </template>

        <ion-tab-button
          tab="opazovalnice"
          @click.prevent="redirectTo('opazovalnice')"
          :class="selectedTabStyle('opazovalnice')"
        >
          <font-awesome-icon
            :icon="['fas', 'tower-observation']"
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
            :icon="['fas', 'person-rifle']"
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
import { useLoginStore } from "@/stores/useLoginStore"
import { storeToRefs } from "pinia"

const { isPripravnik, isLovec } = storeToRefs(useLoginStore())
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
