<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button color="medium" @click="cancel">Prekliči</ion-button>
      </ion-buttons>
      <ion-title class="ion-text-center">Izberi termin</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="confirm">Potrdi</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <!--  -->
  <ion-content class="ion-padding">
    <h3>Prihod</h3>
    <ion-datetime
      presentation="date-time"
      :prefer-wheel="true"
      locale="sl-SI"
      hourCycle="h23"
      :first-day-of-week="1"
      size="cover"
    >
      <span slot="time-label">Začetek</span>
    </ion-datetime>
    <br />
    <h3>Odhod</h3>
    <ion-datetime
      presentation="date-time"
      :prefer-wheel="true"
      locale="sl-SI"
      hourCycle="h23"
      :first-day-of-week="1"
      size="cover"
    >
      <span slot="time-label">Zaključek</span>
    </ion-datetime>
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
  IonDatetime,
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
    IonDatetime,
  },
  data() {
    return {}
  },
  methods: {
    cancel() {
      return modalController.dismiss(null, "cancel")
    },
    async confirm() {
      // TODO preverjanje, ali so vsi podatki vneseni
      // if (!(this.datum && this.zival && this.teza && this.vnosi)) {
      // throw new Error("Vnesi vse podatke")
      // }

      return modalController.dismiss(null, "confirm")
    },
  },
  beforeMount() {},
})
</script>
