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
        v-model="datum"
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
        v-model="zival"
        required
      ></ion-input>
    </ion-item>
    <br />
    <!--  -->
    <template v-for="(vnos, index) in vnosi" :key="index">
      <template v-if="!vnos.hidden">
        <ion-item fill="solid">
          <ion-label position="stacked">Morebitne bolezni</ion-label>
          <ion-input
            placeholder="Morebitna bolezen"
            type="text"
            :clear-input="true"
            v-model="vnosi[index].bolezen"
            required
          ></ion-input>
        </ion-item>
        
        <div class="ion-text-end">
          <ion-button size="small" shape="default" @click="removeField(index)"
            >Odstrani vnos</ion-button
          >
        </div>
      </template>
    </template>
    <!--  -->
    <br />
    <ion-button expand="full" @click="addField()">Dodaj bolezen</ion-button>
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
      datum: null, // nastavi na danasnji dan
      zival: null,
      vnosi: [
        {
          bolezen: null,
          hidden: false,
        },
      ],
    }
  },
  methods: {
    addField() {
      this.vnosi.push({
        bolezen: null,
        hidden: false,
      })
    },
    removeField(index) {
      this.vnosi[index].hidden = true
    },
    cancel() {
      return modalController.dismiss(null, "cancel")
    },
    confirm() {
      return modalController.dismiss(this.name, "confirm")
    },
  },
})
</script>
