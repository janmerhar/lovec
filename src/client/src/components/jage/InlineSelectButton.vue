<template>
  <ion-button :color="color"> <slot> </slot> </ion-button>
</template>

<script setup lang="ts">
import { IonButton } from "@ionic/vue"

defineProps({
  color: {
    type: String,
    default: "primary",
  },
})
</script>

<style scoped>
ion-button {
  --border-radius: 1000000px !important;
  text-transform: uppercase;
}
</style>
