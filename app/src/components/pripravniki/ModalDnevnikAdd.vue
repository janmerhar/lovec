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
      ></ion-input>
    </ion-item>
    <br />
    <br />
    <!--
      Izbira mentorja
      -->
    <ion-item fill="solid">
      <ion-label position="stacked">Mentor</ion-label>
      <ion-select aria-label="fruit" placeholder="Izberi mentorja">
        <ion-select-option value="m1">Mentor 1</ion-select-option>
        <ion-select-option value="m2">Mentor 2</ion-select-option>
        <ion-select-option value="m3">Mentor 3</ion-select-option>
      </ion-select>
    </ion-item>
    <!--
      Nastavi input na dropdown
      -->
    <ion-item fill="solid">
      <ion-label position="stacked">Delo</ion-label>
      <ion-select aria-label="fruit" placeholder="Izberi delo">
        <ion-select-option value="d1">Delo 1</ion-select-option>
        <ion-select-option value="d2">Delo 2</ion-select-option>
        <ion-select-option value="d3">Delo 3</ion-select-option>
      </ion-select>
    </ion-item>
    <!--  -->
    <ion-item fill="solid">
      <ion-label position="stacked">Ure</ion-label>
      <ion-input
        placeholder="Ure"
        type="number"
        :clear-input="true"
        required
      ></ion-input>
    </ion-item>
    <!--  -->
    <ion-item fill="solid">
      <ion-label position="stacked">Opis</ion-label>
      <ion-textarea
        label="Solid textarea"
        labelPlacement="floating"
        fill="solid"
        placeholder="Vnesi opis"
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
  IonSelect,
  IonSelectOption,
} from "@ionic/vue"
import { defineComponent } from "vue"

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
    IonSelect,
    IonSelectOption,
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
