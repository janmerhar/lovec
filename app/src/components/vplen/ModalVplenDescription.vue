<template>
  <ion-header>
    <!--  -->
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button color="medium" @click="cancel">Zapri</ion-button>
      </ion-buttons>
      <ion-title class="ion-text-center">Podatki o vplenu</ion-title>

      <ion-buttons slot="end">
        <ion-button @click="confirm">Zapri</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <!--  -->
  <ion-content class="ion-padding">
    <h3 class="ion-text-center ion-padding-bottom">Sobota 1. 1. 2023</h3>

    <card-vplen-description></card-vplen-description>
    <card-vplen-description></card-vplen-description>
    <card-vplen-description></card-vplen-description>
    <card-vplen-description></card-vplen-description>
  </ion-content>
  <!--  -->
</template>

<script>
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  modalController,
} from "@ionic/vue"
import { defineComponent } from "vue"

import CardVplenDescription from "@/components/vplen/CardVplenDescription.vue"

export default defineComponent({
  name: "ModalVplenDescription",
  components: {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    CardVplenDescription,
  },
  data() {
    return {
      name: "",
    }
  },
  methods: {
    cancel() {
      return modalController.dismiss(null, "cancel")
    },
    confirm() {
      return modalController.dismiss(this.name, "confirm")
    },
  },
})
</script>
