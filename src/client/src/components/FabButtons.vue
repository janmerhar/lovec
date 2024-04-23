<template>
  <ion-fab
    slot="fixed"
    vertical="bottom"
    horizontal="end"
    style="z-index: 10000"
  >
    <ion-fab-button>
      <font-awesome-icon :icon="['fas', 'plus']" fixed-width />
    </ion-fab-button>
    <ion-fab-list side="top">
      <slot></slot>
    </ion-fab-list>
  </ion-fab>
</template>

<script setup lang="ts">
import { IonFab, IonFabButton, IonFabList } from "@ionic/vue"
</script>

<style scoped>
ion-fab-button,
ion-fab {
  --border-radius: 100000rem;
}
</style>
