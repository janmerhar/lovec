<template>
  <header-modal @cancel="cancel()" @confirm="confirm()"
    >Vnesi opremo</header-modal
  >
  <!--  -->
  <ion-content class="ion-padding">
    <ion-item fill="solid">
      <ion-label position="stacked">Tip</ion-label>
      <ion-input
        placeholder="Oprema"
        type="text"
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
        :rows="6"
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

<script lang="ts">
import {
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  modalController,
  IonTextarea,
} from "@ionic/vue"
import { defineComponent } from "vue"

import HeaderModal from "@/components/ui-components/HeaderModal.vue"

import { Oprema } from "@/entities/Oprema"

export default defineComponent({
  name: "ModalOpremaAdd",
  components: {
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    HeaderModal,
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

      const result = await Oprema.insertOprema(
        this.axios,
        this.naziv,
        this.tip,
        this.stanje
      )

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
})
</script>
