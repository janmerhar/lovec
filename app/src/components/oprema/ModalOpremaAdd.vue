<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button color="medium" @click="cancel()">Prekliči</ion-button>
      </ion-buttons>
      <ion-title class="ion-text-center">Vnesi opremo</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="confirm()">Potrdi</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <!--  -->
  <ion-content class="ion-padding">
    <ion-item fill="solid">
      <ion-label position="stacked">Tip</ion-label>
      <ion-input
        placeholder="Oprema"
        type="text"
        :clear-input="true"
        v-model="tip"
        required
      ></ion-input>
    </ion-item>
    <br />
    <ion-item fill="solid">
      <ion-label position="stacked">Naziv</ion-label>
      <ion-input
        placeholder="Oprema"
        type="text"
        :clear-input="true"
        v-model="naziv"
        required
      ></ion-input>
    </ion-item>
    <br />
    <ion-item fill="solid">
      <ion-label position="stacked">Opis</ion-label>
      <ion-textarea
        label="Solid textarea"
        labelPlacement="floating"
        :auto-grow="true"
        rows="6"
        fill="solid"
        placeholder="Vnesi opis"
        v-model="stanje"
      ></ion-textarea>
    </ion-item>
    <!--  -->
    <br />
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
  IonTextarea,
} from "@ionic/vue"
import { defineComponent } from "vue"

import { Oprema } from "@/entities/Oprema"

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
    IonTextarea,
  },
  data() {
    return {
      naziv: "",
      tip: "",
      stanje: "",
    }
  },
  methods: {
    //
    // TODO noce vrniti podatkov ko enkrat vnesem opremo, vnese mi pa jo
    //
    async vnesiOprema() {
      // TODO
      // preverjane, ali podatki obstajajo

      const result = await Oprema.vnesiOprema(this.naziv, this.tip, this.stanje)

      return result
    },
    cancel() {
      return modalController.dismiss(null, "cancel")
    },
    async confirm() {
      const oprema = await this.vnesiOprema()

      if (oprema.status === 200) {
        return modalController.dismiss(null, "confirm")
      }
      // TODO obvesti o napaki pri vnasanju
    },
  },
  async beforeMount() {
    Oprema.setCustomAxios(this.axios)
  },
})
</script>
