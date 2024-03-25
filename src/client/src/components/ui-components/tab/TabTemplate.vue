<template>
  <ion-page>
    <slot name="header"></slot>
    <ion-content color="primary fade-in">
      <ion-content id="tab-template-body" class="brd">
        <slot name="body"></slot>
      </ion-content>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from "@ionic/vue"
</script>

<style scoped>
.tab-body {
  width: 100%;
  height: 100%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: var(--ion-background-color);
}

.header-text {
  text-transform: uppercase;
  font-size: 20px;
  letter-spacing: 1px;
  font-weight: 500;
}

.fake-border {
  border-top-left-radius: 100000px !important;
  border-top-right-radius: 100000px !important;
  background-color: var(--ion-background-color) !important;
  min-height: 20px !important;
}

.brd {
  border-top-left-radius: 20px !important;
  border-top-right-radius: 20px !important;
  --ion-background-color: transparent;
  background-color: rgb(var(--ion-background-color-rgb)) !important;
  overflow: hidden;
}
</style>
