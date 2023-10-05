<template>
  <header-modal :confirm-button="true" @cancel="cancel()" @confirm="confirm()"
    >Vnesi vplen</header-modal
  >
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
    <br />
    <ion-item fill="outline" class="">
      <ion-label position="stacked">Teža</ion-label>
      <ion-input
        placeholder="Teža"
        type="number"
        :clear-input="true"
        v-model="teza"
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
          <ion-button size="small" @click="removeField(index)"
            >Odstrani vnos</ion-button
          >
        </div>
      </template>
    </template>
    <!--  -->
    <br />
    <ion-button expand="block" @click="addField()">Dodaj bolezen</ion-button>
  </ion-content>
  <!--  -->
</template>

<script lang="ts">
import {
  IonContent,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  modalController,
} from "@ionic/vue"

import { defineComponent } from "vue"

import { Vplen } from "@/entities/Vplen"
import HeaderModal from "@/components/ui-components/HeaderModal.vue"

export default defineComponent({
  name: "ModalVplenAdd",
  components: {
    IonContent,
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
    HeaderModal,
  },
  data() {
    return {
      name: "krneki podatek, ki se vrne",
      //
      // TODO premisli, kako bi to naredil
      // koordinate: [0, 0],
      datum: new Date().toISOString().slice(0, 10),
      zival: "",
      teza: 0,
      vnosi: [
        {
          bolezen: "",
          hidden: false,
        },
      ],
    }
  },
  methods: {
    addField() {
      this.vnosi.push({
        bolezen: "",
        hidden: false,
      })
    },
    removeField(index: number) {
      this.vnosi[index].hidden = true
    },
    cancel() {
      return modalController.dismiss(null, "cancel")
    },
    async confirm() {
      // TODO preverjanje, ali so vsi podatki vneseni
      // if (!(this.datum && this.zival && this.teza && this.vnosi)) {
      // throw new Error("Vnesi vse podatke")
      // }

      const bolezni = this.vnosi
        .filter((el) => el.hidden != false && el.bolezen != null)
        .map((el) => el.bolezen)

      await Vplen.insertVplen(
        this.axios,
        this.zival,
        this.teza,
        this.datum,
        bolezni
      )

      return modalController.dismiss(null, "confirm")
    },
    async fetchVpleni() {
      const vpleni = await Vplen.fetchVpleni(this.axios, 1)

      console.log(vpleni)
    },
  },
})
</script>
