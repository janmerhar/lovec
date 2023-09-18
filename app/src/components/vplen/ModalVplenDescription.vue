<template>
  <ion-header>
    <!--  -->
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button color="medium" @click="cancel">Zapri</ion-button>
      </ion-buttons>
      <ion-title class="ion-text-center">Podatki o vplenu</ion-title>

      <ion-buttons slot="end">
        <ion-button @click="confirm">Zapri</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <!--  -->
  <ion-content class="ion-padding">
    <h3 class="ion-text-center ion-padding-bottom">
      {{ formatDateToString($attrs.datum) }}
    </h3>

    <template v-for="vplen in vpleni" :key="vplen.id">
      <card-vplen-description :vplen="vplen"></card-vplen-description>
    </template>
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
} from "@ionic/vue"
import { defineComponent } from "vue"

import CardVplenDescription from "@/components/vplen/CardVplenDescription.vue"

import { Vplen } from "@/entities/Vplen"

export default defineComponent({
  name: "ModalVplenDescription",
  components: {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    CardVplenDescription,
  },
  data() {
    return {
      vpleni: [],
    }
  },
  methods: {
    cancel() {
      return modalController.dismiss(null, "cancel")
    },
    confirm() {
      return modalController.dismiss(null, "confirm")
    },
    formatDateToString(date) {
      const datum = new Date(date)
      const formattedDate = datum.toLocaleDateString("sl-SI", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })

      return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
    },
    async fetchVplenPodrobnosti(datum) {
      const vpleni = await Vplen.fetchVplen(this.axios, datum)

      this.vpleni = vpleni.data
    },
  },
  async beforeMount() {
    await this.fetchVplenPodrobnosti(this.$attrs.datum)
  },
})
</script>
