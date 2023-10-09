<template>
  <header-modal @cancel="cancel()" @confirm="confirm()"
    >Vnesi dnevnik</header-modal
  >
  <!--  -->
  <ion-content class="ion-padding">
    <datepicker-horizontal
      @change="(novDatum) => updateDatum(novDatum)"
      class="ion-margin-bottom"
    ></datepicker-horizontal>
    <!--
      Izbira mentorja
      - mentor je ze izbran, zato uporabnik nima izbire
      -->
    <ion-item fill="solid" class="ion-margin-vertical">
      <ion-label position="stacked">Mentor</ion-label>
      <ion-input type="text" :value="$attrs.mentorIme" disabled></ion-input>
    </ion-item>
    <!--
      Nastavi input na dropdown
      -->
    <ion-item fill="solid" class="ion-margin-bottom">
      <ion-label position="stacked">Delo</ion-label>
      <ion-input
        placeholder="Delo"
        type="text"
        v-model="delo"
        required
      ></ion-input>
    </ion-item>
    <!--  -->
    <ion-item fill="solid" class="ion-margin-top">
      <ion-label position="stacked">Ure</ion-label>
      <ion-input
        placeholder="Ure"
        type="number"
        v-model="ure"
        required
      ></ion-input>
    </ion-item>
    <!--  -->
    <ion-item fill="solid" class="ion-margin-top">
      <ion-label position="stacked">Opis</ion-label>
      <ion-textarea
        label="Solid textarea"
        labelPlacement="floating"
        :auto-grow="true"
        :rows="6"
        fill="solid"
        placeholder="Vnesi opis"
        v-model="opis"
      ></ion-textarea>
    </ion-item>
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
import DatepickerHorizontal from "../ui-components/DatepickerHorizontal.vue"

import { Dnevnik } from "@/entities/Dnevnik"

export default defineComponent({
  name: "ModalDnevnikAdd",
  components: {
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    HeaderModal,
    DatepickerHorizontal,
  },
  data() {
    return {
      datum: new Date().toISOString().slice(0, 10),
      delo: "",
      ure: 1,
      opis: "",
      name: "",
    }
  },
  methods: {
    updateDatum(novDatum: Date) {
      this.datum = novDatum.toISOString().slice(0, 10)
    },

    cancel() {
      return modalController.dismiss(null, "cancel")
    },
    async confirm(): Promise<void> {
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
          modalController.dismiss(this.name, "confirm")
        }
      } else {
        // TODO - Add error message
        console.log("Empty fields")
      }
    },
  },
})
</script>
