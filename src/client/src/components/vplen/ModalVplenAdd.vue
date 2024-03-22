<template>
  <modal-template>
    <template #header>
      <header-modal
        :confirm-button="true"
        @cancel="cancel()"
        @confirm="confirm()"
        >Vnesi vplen</header-modal
      >
    </template>
    <template #body>
      <!--  -->
      <datepicker-horizontal
        @change="(novDatum) => updateDatum(novDatum)"
      ></datepicker-horizontal>
      <br />
      <br />
      <ion-item fill="solid">
        <ion-label position="stacked">Žival</ion-label>
        <ion-input
          placeholder="Žival"
          type="text"
          v-model="zival"
          required
        ></ion-input>
      </ion-item>
      <br />
      <br />
      <ion-item fill="solid">
        <ion-label position="stacked">Teža</ion-label>
        <ion-input
          placeholder="Teža"
          type="number"
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
      <!--  -->
    </template>
  </modal-template>
</template>

<script lang="ts">
import {
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  modalController,
} from "@ionic/vue"

import HeaderModal from "@/components/ui-components/HeaderModal.vue"
import DatepickerHorizontal from "../ui-components/DatepickerHorizontal.vue"
import ModalTemplate from "@/components/ui-components/modal/ModalTemplate.vue"

import { defineComponent } from "vue"

import { Vplen } from "@/entities/Vplen"

export default defineComponent({
  name: "ModalVplenAdd",
  components: {
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
    HeaderModal,
    DatepickerHorizontal,
    ModalTemplate,
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
    updateDatum(novDatum: string) {
      this.datum = novDatum
    },

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

      // TODO
      // ti mi ne vnasas bolezni
      // in se na splosno cudno vedes
      // ce ni bolezni, imam potem na ogledu vplenov dodatne tezave
      // also mi vneses tabelo bolezni, ki ima prazna polja
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
