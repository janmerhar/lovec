<template>
  <ion-button :color="color" style="margin: 0px; width: 30px; height: 30px">
    <slot></slot>
  </ion-button>
</template>

<script setup lang="ts">
import { IonButton } from "@ionic/vue"

defineProps({
  color: {
    type: String,
    default: "success",
  },
})
</script>

<style scoped>
ion-button {
  --border-radius: 100000rem;
}
</style>
