<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button color="medium" @click="cancel">Zapri</ion-button>
      </ion-buttons>
      <ion-title class="ion-text-center">Podatki o jagi</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="confirm">Odzovi</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <!--  -->
  <ion-content class="ion-padding">
    <div>
      <ion-text color="primary">
        <h4>Naslov 3</h4>
      </ion-text>
      <ion-text color="dark">
        <p>Neki content notri lol</p>
      </ion-text>
    </div>
    <div>
      <ion-text color="primary">
        <h4>Naslov 3</h4>
      </ion-text>
      <ion-text color="dark">
        <p>Neki content notri lol</p>
      </ion-text>
    </div>
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
  IonText,
} from "@ionic/vue"
import { defineComponent } from "vue"

export default defineComponent({
  name: "ModalJagaDescription",
  components: {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonText,
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
