<template>
  <ion-card
    style="
      display: flex !important;
      align-items: center;
      flex-direction: row;
      position: relative;
      gap: 1rem;
      border-radius: 20px;
      box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    "
  >
    <!-- left-side -->
    <div style="display: inline-block; width: 40%">
      <slot name="left-side"></slot>
    </div>
    <!-- left-side -->

    <!-- right-top -->
    <div style="position: absolute; top: 0.5rem; right: 0.5rem">
      <slot name="right-top"></slot>
    </div>
    <!-- right-top -->

    <!-- right-side -->
    <div
      style="
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 100%;
        min-height: 10rem;
      "
    >
      <slot name="right-side"></slot>
    </div>
    <!-- right-side -->
  </ion-card>
</template>

<script setup lang="ts">
import { IonCard } from "@ionic/vue"
</script>
