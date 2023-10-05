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
          <font-awesome-icon
            :icon="['fas', 'people-group']"
            size="xl"
            fixed-width
          />
          <ion-label>Jage</ion-label>
        </ion-tab-button>

        <ion-tab-button
          tab="pripravniki"
          @click="clickOnTab('pripravniki')"
          :class="{ 'active-tab': selectedTab === 'pripravniki' }"
        >
          <font-awesome-icon
            :icon="['fas', 'address-book']"
            size="xl"
            fixed-width
          />
          <ion-label>Dnevniki</ion-label>
        </ion-tab-button>

        <ion-tab-button
          tab="opazovalnica"
          @click.prevent="clickOnTab('opazovalnica')"
          :class="{ 'active-tab': selectedTab === 'opazovalnica' }"
        >
          <font-awesome-icon
            :icon="['fas', 'tower-observation']"
            size="xl"
            fixed-width
          />
          <ion-label>Opazovalnice</ion-label>
        </ion-tab-button>

        <ion-tab-button
          tab="oprema"
          @click.prevent="clickOnTab('oprema')"
          :class="{ 'active-tab': selectedTab === 'oprema' }"
        >
          <font-awesome-icon
            :icon="['fas', 'person-rifle']"
            size="xl"
            fixed-width
          />
          <ion-label>Oprema</ion-label>
        </ion-tab-button>

        <ion-tab-button
          tab="vplen"
          @click.prevent="clickOnTab('vplen')"
          :class="{ 'active-tab': selectedTab === 'vplen' }"
        >
          <font-awesome-icon :icon="['fas', 'paw']" size="xl" fixed-width />
          <ion-label>Vplen</ion-label>
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
    return {}
  },
  computed: {
    selectedTab() {
      return this.$route.name
    },
  },
  methods: {
    clickOnTab(tabName: string) {
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
