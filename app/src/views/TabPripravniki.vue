<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <refresher-component :refresh="refresh"></refresher-component>
      <!-- Mentor -->
      <template v-if="uporabnikStore.isMentor">
        <h3 class="ion-text-center">Dnevniki za dan</h3>
        <datepicker-horizontal
          @change="(novDatum) => updateDatum(novDatum)"
        ></datepicker-horizontal>
      </template>

      <!-- Pripravnik -->
      <template v-else>
        <h3 class="ion-text-center">Dnevniki</h3>
      </template>
      <!--  -->
      <template v-for="dnevnik in dnevniki" :key="dnevnik.id">
        <template v-if="uporabnikStore.isMentor">
          <card-dnevnik-description
            :subtitle="formatDateToString(dnevnik.datum)"
            :title="`${dnevnik.pripravnik.ime} ${dnevnik.pripravnik.priimek}`"
            :showButtons="uporabnikStore.isMentor"
            :dnevnik="dnevnik"
            @accept="
              (izbranDnevnik) => spremeniStatus(izbranDnevnik, 'potrjen')
            "
            @reject="
              (izbranDnevnik) => spremeniStatus(izbranDnevnik, 'zavrnjen')
            "
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
import { modalController, IonPage, IonContent } from "@ionic/vue"

import { defineComponent } from "vue"
import { ref } from "vue"

import FabButtonAdd from "@/components/FabButtonAdd.vue"
import ModalDnevnikAdd from "@/components/pripravniki/ModalDnevnikAdd.vue"
import CardDnevnikDescription from "@/components/pripravniki/CardDnevnikDescription.vue"
import RefresherComponent from "@/components/ui-components/RefresherComponent.vue"
import DatepickerHorizontal from "@/components/ui-components/DatepickerHorizontal.vue"

import { useUporabnikStore } from "@/stores/uporabnikStore"

import { Dnevnik } from "@/entities/Dnevnik"

export default defineComponent({
  components: {
    IonPage,
    IonContent,
    FabButtonAdd,
    CardDnevnikDescription,
    RefresherComponent,
    DatepickerHorizontal,
  },
  data() {
    return {
      datum: new Date().toISOString().slice(0, 10),
      dnevniki: ref<Dnevnik[]>([]),
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

    formatDateToString(date: string) {
      const datum = new Date(date)
      const formattedDate = datum.toLocaleDateString("sl-SI", {
        weekday: "long",
        day: "numeric",
        month: "numeric",
        year: "numeric",
      })

      return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
    },

    //
    // Pripravnik
    //
    async pripravnikDnevnikiStran(stran: number): Promise<Dnevnik[]> {
      const dnevniki = await Dnevnik.fetchDnevnikiPripravnik(this.axios, stran)

      return dnevniki.data
    },

    async pripravnikDnevniki() {
      const concatDnevniki: Dnevnik[] = []

      for (let i = 1; i <= this.stran; i++) {
        const dnevniki = await this.pripravnikDnevnikiStran(i)

        concatDnevniki.push(...dnevniki)
      }

      this.dnevniki = concatDnevniki
    },

    //
    // Mentor
    //
    async mentorDnevniki() {
      const dnevniki = await Dnevnik.fetchDnevnikiMentor(this.axios, this.datum)

      this.dnevniki = []
      this.dnevniki = dnevniki.data
    },

    async spremeniStatus(izbranDnevnik: Dnevnik, status: string) {
      const result = await izbranDnevnik.spremeniStatus(status)

      await this.mentorDnevniki()
    },

    async fetchDnevniki() {
      // Mentor
      if (this.uporabnikStore.isMentor) {
        await this.mentorDnevniki()
      }
      // Pripravnik
      else {
        await this.pripravnikDnevniki()
      }
    },

    async refresh(event: CustomEvent) {
      await this.fetchDnevniki()

      event.detail.complete()
    },

    async updateDatum(novDatum: Date) {
      this.datum = novDatum.toISOString().slice(0, 10)

      this.fetchDnevniki()
    },
  },
  async beforeMount() {
    this.fetchDnevniki()
  },
})
</script>
