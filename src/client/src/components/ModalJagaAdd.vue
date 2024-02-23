<template>
  <header-modal @cancel="cancel()" @confirm="confirm()">
    Dodaj Jago
  </header-modal>
  <ion-content class="ion-padding">
    <ion-item>
      <ion-label position="stacked">Your name</ion-label>
      <ion-input v-model="name" placeholder="Your name"></ion-input>
    </ion-item>
  </ion-content>
</template>

<script lang="ts">
import {
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  modalController,
} from "@ionic/vue"

import { defineComponent } from "vue"

import HeaderModal from "./ui-components/HeaderModal.vue"

export default defineComponent({
  name: "ModalJagaAdd",
  components: {
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    HeaderModal,
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
