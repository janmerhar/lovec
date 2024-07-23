<template>
  <ion-header>
    <ion-toolbar color="primary" class="responsive-toolbar">
      <ion-title size="large">{{
        $t("framework.toolbarNavigation.appName")
      }}</ion-title>
      <ion-buttons slot="secondary">
        <ion-button @click="redirectTo('admin_izkaznica')">
          <img
            :src="uporabnik?.slika"
            :class="selectedTabStyle('admin_uporabnik_id')"
          />
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script setup lang="ts">
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
} from "@ionic/vue"

import { useLoginStore } from "@/stores/useLoginStore"
import { useTabNavigation } from "@/composables/useTabNavigation"
import { storeToRefs } from "pinia"

const { selectedTabStyle, redirectTo } = useTabNavigation()
const { uporabnik } = storeToRefs(useLoginStore())
</script>

<style scoped>
img {
  width: 32px;
  height: 32px;
  object-fit: cover;
  border-radius: 50%;
  border: 1px solid var(--ion-background-color-step-600);
}

.header-md::after {
  background-image: none !important;
}

.active-tab {
  border: 2px solid var(--ion-color-secondary);
  border-radius: 50%;
}
</style>
