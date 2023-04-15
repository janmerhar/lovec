<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button color="medium" @click="cancel">Prekliči</ion-button>
      </ion-buttons>
      <ion-title class="ion-text-center">Vnesi opremo</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="confirm">Potrdi</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <!--  -->
  <ion-content class="ion-padding">
    <ion-item fill="solid">
      <ion-label position="stacked">Oprema</ion-label>
      <ion-input
        placeholder="Oprema"
        type="text"
        :clear-input="true"
        required
      ></ion-input>
    </ion-item>
    <ion-item fill="solid">
      <ion-label position="stacked">Opis opreme</ion-label>
      <ion-input
        placeholder="Opis opreme"
        type="text"
        :clear-input="true"
        required
      ></ion-input>
    </ion-item>
    <div class="ion-text-end">
      <ion-button size="small" shape="default">Odstrani vnos</ion-button>
    </div>
    <!--  -->
    <ion-item fill="solid">
      <ion-label position="stacked">Oprema</ion-label>
      <ion-input
        placeholder="Oprema"
        type="text"
        :clear-input="true"
        required
      ></ion-input>
    </ion-item>
    <ion-item fill="solid">
      <ion-label position="stacked">Opis opreme</ion-label>
      <ion-input
        placeholder="Opis opreme"
        type="text"
        :clear-input="true"
        required
      ></ion-input>
    </ion-item>
    <div class="ion-text-end">
      <ion-button size="small" shape="default">Odstrani vnos</ion-button>
    </div>
    <br />
    <ion-button expand="full">Dodaj vnos</ion-button>
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
  name: "ModalOpremaAdd",
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
