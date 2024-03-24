<template>
  <ion-fab slot="fixed" vertical="bottom" horizontal="end">
    <ion-fab-button color="tertiary">
      <ion-icon :icon="add" size="large"></ion-icon>
    </ion-fab-button>
  </ion-fab>
</template>

<script setup lang="ts">
import { add } from "ionicons/icons"
import { IonFab, IonFabButton, IonIcon } from "@ionic/vue"
</script>

<style scoped>
ion-fab-button,
ion-fag {
  --border-radius: 100000rem;
}
</style>
