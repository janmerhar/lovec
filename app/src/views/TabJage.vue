<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 1</ion-title>
        </ion-toolbar>
      </ion-header>

      <card-jaga>banana</card-jaga>
      <card-jaga>ananab</card-jaga>
      <card-jaga>eggplant</card-jaga>
      <card-jaga>peach</card-jaga>

      <fab-button></fab-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue"

import FabButton from "@/components/FabButtonAdd.vue"
import CardJaga from "@/components/CardJaga.vue"
</script>
