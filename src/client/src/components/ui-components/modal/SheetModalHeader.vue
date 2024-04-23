<template>
  <ion-toolbar color="primary">
    <ion-title slot="" class="ion-text-center header-text">
      <!-- slot for providing title -->
      <slot></slot>
    </ion-title>
  </ion-toolbar>
</template>

<script setup lang="ts">
import { IonToolbar, IonTitle } from "@ionic/vue"
</script>

<style scoped>
.header-text {
  text-transform: uppercase;
  font-size: 20px;
  letter-spacing: 1px;
  font-weight: 500;
  padding-top: 5px;
}

ion-toolbar {
  --min-height: 65px;
}
</style>
