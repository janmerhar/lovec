<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button color="medium" @click="cancel">Prekliči</ion-button>
      </ion-buttons>
      <ion-title class="ion-text-center">Vnesi vplen</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="confirm">Potrdi</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <!--  -->
  <ion-content class="ion-padding">
    <ion-item fill="outline" class="">
      <ion-label position="stacked">Datum</ion-label>
      <ion-input
        placeholder="Datum"
        type="date"
        :clear-input="true"
        required
      ></ion-input>
    </ion-item>
    <br />
    <br />
    <ion-item fill="solid">
      <ion-label position="stacked">Žival</ion-label>
      <ion-input
        placeholder="Žival"
        type="text"
        :clear-input="true"
        required
      ></ion-input>
    </ion-item>
    <ion-item fill="solid">
      <ion-label position="stacked">Morebitne bolezni</ion-label>
      <ion-input
        placeholder="Morebitne bolezni"
        type="text"
        :clear-input="true"
        required
      ></ion-input>
    </ion-item>
    <div class="ion-text-end">
      <ion-button size="small" shape="default">Odstrani vnos</ion-button>
    </div>
    <br />
    <ion-button expand="full">Dodaj vplen</ion-button>
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
  IonItem,
  IonLabel,
  IonInput,
  modalController,
} from "@ionic/vue"
import { defineComponent } from "vue"

export default defineComponent({
  name: "ModalVplenAdd",
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
