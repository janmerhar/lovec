<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <!-- Mentor -->
      <template v-if="uporabnikStore.isMentor">
        <h3 class="ion-text-center">Dnevniki za dan</h3>
        <div class="ion-padding">
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
        </div>
      </template>

      <!-- Pripravnik -->
      <template v-else>
        <h3 class="ion-text-center">Dnevniki</h3>
      </template>
      <!--  -->
      <template v-for="(dnevnik, index) in dnevniki" :key="index">
        <template v-if="uporabnikStore.isMentor">
          <card-dnevnik-description
            :subtitle="formatDateToString(dnevnik.datum)"
            :title="`${dnevnik.pripravnik.ime} ${dnevnik.pripravnik.priimek}`"
            :showButtons="uporabnikStore.isMentor"
            :dnevnik="dnevnik"
          ></card-dnevnik-description>
        </template>

        <template v-else>
          <card-dnevnik-description
            :subtitle="'Mentor ' + uporabnikStore.mentorIme"
            :title="formatDateToString(dnevnik.datum)"
            :showButtons="uporabnikStore.isMentor"
            :dnevnik="dnevnik"
          ></card-dnevnik-description>
        </template>
      </template>
      <!--  -->

      <!-- Gumb samo za pripravnika, da vnese porocilo -->
      <template v-if="!uporabnikStore.isMentor">
        <fab-button-add
          @click.prevent="openModalPripravnikAdd"
        ></fab-button-add>
      </template>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  modalController,
  IonPage,
  IonContent,
  IonLabel,
  IonItem,
  IonInput,
} from "@ionic/vue"

import { defineComponent } from "vue"

import FabButtonAdd from "@/components/FabButtonAdd.vue"
import ModalDnevnikAdd from "@/components/pripravniki/ModalDnevnikAdd.vue"
import CardDnevnikDescription from "@/components/pripravniki/CardDnevnikDescription.vue"

import { useUporabnikStore } from "@/stores/useUporabnikStore"

import { Dnevnik } from "@/entities/Dnevnik"

export default defineComponent({
  components: {
    IonPage,
    IonContent,
    FabButtonAdd,
    CardDnevnikDescription: CardDnevnikDescription,
    IonLabel,
    IonItem,
    IonInput,
  },
  data() {
    return {
      datum: new Date().toISOString().slice(0, 10),
      dnevniki: [],
      stran: 1,
    }
  },
  setup() {
    const uporabnikStore = useUporabnikStore()

    return {
      uporabnikStore,
    }
  },
  methods: {
    async openModalPripravnikAdd() {
      const modal = await modalController.create({
        component: ModalDnevnikAdd,
        componentProps: {
          mentorIme: this.uporabnikStore.mentorIme,
        },
      })
      modal.present()
    },
    formatDateToString(date) {
      const datum = new Date(date)
      const formattedDate = datum.toLocaleDateString("sl-SI", {
        weekday: "long",
        day: "numeric",
        month: "numeric",
        year: "numeric",
      })

      return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
    },
    // Pripravnik
    async pripravnikDnevniki() {
      const dnevniki = await Dnevnik.fetchDnevnikiPripravnik(this.stran)

      this.stran += 1
      this.dnevniki = dnevniki.data
    },
    // Mentor
    async mentorDnevniki() {
      const dnevniki = await Dnevnik.fetchDnevnikiMentor(this.datum)

      this.dnevniki = dnevniki.data
    },
  },
  async beforeMount() {
    Dnevnik.setCustomAxios(this.axios)
    // Mentor
    if (this.uporabnikStore.isMentor) {
      await this.mentorDnevniki()
    }
    // Pripravnik
    else {
      await this.pripravnikDnevniki()
    }
  },
})
</script>
