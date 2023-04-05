<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button color="medium" @click="cancel">Prekliči</ion-button>
      </ion-buttons>
      <ion-title class="ion-text-center">Dodaj jago</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="confirm">Potrdi</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-item>
      <ion-label position="stacked">Your name</ion-label>
      <ion-input v-model="name" placeholder="Your name"></ion-input>
    </ion-item>
  </ion-content>
</template>

<script>
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  modalController,
} from "@ionic/vue"
import { defineComponent } from "vue"

export default defineComponent({
  name: "ModalJagaAdd",
  components: {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
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
