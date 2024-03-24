<template>
  <ion-header>
    <ion-toolbar color="primary" class="responsive-toolbar">
      <ion-title size="large">Lovec</ion-title>
      <ion-buttons slot="secondary">
        <ion-button @click="redirectTo('izkaznica')">
          <img :src="uporabnik?.slika" :class="selectedTabStyle('izkaznica')" />
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
  width: 31px;
  height: 31px;
  object-fit: cover;
  border-radius: 50%;
  border: 1px solid var(--ion-color-step-600);
}

.header-md::after {
  background-image: none !important;
}
</style>
