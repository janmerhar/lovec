<template>
  <ion-card
    style="
      border-radius: 20px;
      box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
      padding: 1rem;
    "
  >
    <slot></slot>
  </ion-card>
</template>

<script setup lang="ts">
import { IonCard } from "@ionic/vue"
</script>
