<template>
  <ion-card :button="true">
    <ion-card-header>
      <ion-card-subtitle>Lovec, ki vodi jago</ion-card-subtitle>
      <ion-card-title><slot></slot></ion-card-title>
    </ion-card-header>

    <ion-card-content>
      Podrobnossti jage... Here's a small text description for the card content.
      Nothing more, nothing less.
    </ion-card-content>

    <ion-button fill="clear">Pridruzi</ion-button>
    <ion-button fill="clear">Izbrisi</ion-button>
  </ion-card>
</template>

<script lang="ts">
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
} from "@ionic/vue"
import { defineComponent } from "vue"

export default defineComponent({
  components: {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
  },
  props: [],
  emits: [],
})
</script>
