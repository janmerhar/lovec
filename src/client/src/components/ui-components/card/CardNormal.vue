<template>
  <ion-card
    style="
      border-radius: 20px;
      box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
      padding: 1rem;
    "
  >
    <!-- right-top -->
    <div style="position: absolute; top: 0.5rem; right: 0.5rem">
      <slot name="right-top"></slot>
    </div>
    <!-- right-top -->

    <!-- default -->
    <slot></slot>
    <!-- default -->
  </ion-card>
</template>

<script setup lang="ts">
import { IonCard } from "@ionic/vue"
</script>
