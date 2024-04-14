<template>
  <slot name="header"></slot>
  <ion-content color="primary">
    <div class="ion-padding modal-body">
      <slot name="body"></slot>
    </div>
  </ion-content>
</template>

<script setup lang="ts">
import { IonContent } from "@ionic/vue"
</script>

<style scoped>
.modal-body {
  width: 100%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: var(--ion-background-color);
  overflow: hidden;
}
</style>
