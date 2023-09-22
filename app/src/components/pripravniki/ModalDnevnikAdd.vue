<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button color="medium" @click="cancel">Prekliči</ion-button>
      </ion-buttons>
      <ion-title class="ion-text-center">Vnesi dnevnik</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="confirm">Potrdi</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <!--  -->
  <!-- 
    Avtomatsko nastavi datum na danasnjega
   -->
  <ion-content class="ion-padding">
    <ion-item fill="outline" class="">
      <ion-label position="stacked">Datum</ion-label>
      <ion-input
        placeholder="Datum"
        type="date"
        :clear-input="true"
        required
        v-model="datum"
      ></ion-input>
    </ion-item>
    <br />
    <br />
    <!--
      Izbira mentorja
      - mentor je ze izbran, zato uporabnik nima izbire
      -->
    <ion-item fill="solid">
      <ion-label position="stacked">Mentor</ion-label>
      <ion-input type="text" :value="$attrs.mentorIme" disabled></ion-input>
    </ion-item>
    <!--
      Nastavi input na dropdown
      -->
    <ion-item fill="solid">
      <ion-label position="stacked">Delo</ion-label>
      <ion-input
        placeholder="Delo"
        type="text"
        :clear-input="true"
        v-model="delo"
        required
      ></ion-input>
    </ion-item>
    <!--  -->
    <ion-item fill="solid">
      <ion-label position="stacked">Ure</ion-label>
      <ion-input
        placeholder="Ure"
        type="number"
        :clear-input="true"
        v-model="ure"
        required
      ></ion-input>
    </ion-item>
    <!--  -->
    <ion-item fill="solid">
      <ion-label position="stacked">Opis</ion-label>
      <ion-textarea
        label="Solid textarea"
        labelPlacement="floating"
        :auto-grow="true"
        rows="6"
        fill="solid"
        placeholder="Vnesi opis"
        v-model="opis"
      ></ion-textarea>
    </ion-item>
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

import { Dnevnik } from "@/entities/Dnevnik"

export default defineComponent({
  name: "ModalDnevnikAdd",
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
      datum: new Date().toISOString().slice(0, 10),
      delo: "",
      ure: null,
      opis: "",
    }
  },
  methods: {
    cancel() {
      return modalController.dismiss(null, "cancel")
    },
    async confirm() {
      // Checking if the fields are not empty
      if (this.datum && this.delo && this.ure && this.opis) {
        const result = await Dnevnik.insertDnevnik(
          this.axios,
          this.datum,
          this.ure,
          this.opis,
          this.delo
        )

        if (result.status == 200) {
          return modalController.dismiss(this.name, "confirm")
        }
      } else {
        // TODO - Add error message
        console.log("Empty fields")
      }
    },
  },
})
</script>
