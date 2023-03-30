<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Lovec</ion-title>
      <ion-buttons slot="secondary">
        <ion-button fill="solid" href="/tabs/izkaznica">
          <font-awesome-icon icon="fa-solid fa-id-card " />
          <p class="ion-margin">Izkaznica</p>
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
} from "@ionic/vue"
</script>
