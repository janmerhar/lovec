<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Lovec</ion-title>
      <ion-buttons slot="secondary">
        <ion-button fill="solid" href="/tabs/izkaznica">
          <ion-icon slot="start" :icon="star"></ion-icon>
          Izkaznica
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script setup lang="ts">
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
} from "@ionic/vue"
import { star } from "ionicons/icons"
</script>
