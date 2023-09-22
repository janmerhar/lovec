<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <!-- 
        // TODO
        tukaj lahko na vrhu dam se eno opozorilo oz gumb,
        ki uporabniku sporoca, da ima aktivno rezervacijo
      <div class="ion-padding">
        <ion-button color="danger" expand="full">
          Zaključi obisk opazovalnice
        </ion-button>
      </div>
    -->

      <map-component
        :opazovalnice="opazovalnice"
        @opazovalnica="(index) => izberiOpazovalnico(index)"
      ></map-component>

      <template v-if="izbranaOpazovalnica == null">
        <div class="ion-padding">
          <h4 class="ion-text-center">Izberite opazovalnico</h4>
        </div>
      </template>

      <template v-else>
        <div class="ion-padding-top ion-padding-horizontal">
          <h4 class="ion-text-center">Zasedenost opazovalnice za dan</h4>
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
        <div class="ion-padding-horizontal">
          <ion-list :inset="true">
            <ion-item
              v-for="obisk in izbranaOpazovalnica.obiski"
              :key="obisk._id"
            >
              <ion-label>
                Od {{ formatTime(obisk.zacetek) }} do
                {{ formatTime(obisk.konec) }}
              </ion-label>
            </ion-item>
          </ion-list>

          <ion-button expand="full">
            Vstopi v opazovalnico brez rezervacije
          </ion-button>
          <ion-button
            expand="full"
            @click.prevent="openModalOpazovanilnicaRezerviraj()"
          >
            Rezerviraj opazovalnico
          </ion-button>
          <!-- <ion-button expand="full">Ogled zgodovine zasedenosti</ion-button> -->
        </div>
      </template>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonContent,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  modalController,
} from "@ionic/vue"

import { defineComponent } from "vue"

import MapComponent from "@/components/MapComponent.vue"
import ModalOpazovalnicaRezerviraj from "@/components/opazovalnica/ModalOpazovalnicaRezerviraj.vue"

import { Opazovalnica } from "@/entities/Opazovalnica"

export default defineComponent({
  components: {
    IonPage,
    IonContent,
    IonButton,
    MapComponent,
    IonList,
    IonItem,
    IonLabel,
  },
  data() {
    return {
      opazovalnice: [],
      izbranaOpazovalnica: null,
      datum: new Date().toISOString().slice(0, 10),
    }
  },
  methods: {
    izberiOpazovalnico(index) {
      this.datum = new Date().toISOString().slice(0, 10)
      this.izbranaOpazovalnica = this.opazovalnice[index]
    },
    async openModalOpazovanilnicaRezerviraj() {
      const modal = await modalController.create({
        component: ModalOpazovalnicaRezerviraj,
        componentProps: {
          opazovalnica: this.izbranaOpazovalnica,
        },
      })
      modal.present()
    },
    formatTime(date) {
      const datum = new Date(date)
      const hour = datum.getHours().toString().padStart(2, "0")
      const minute = datum.getMinutes().toString().padStart(2, "0")
      return `${hour}.${minute}`
    },
  },
  async beforeMount() {
    const result = await Opazovalnica.fetchOpazovalnice(this.axios)
    this.opazovalnice = result.data
  },
})
</script>

<style scoped>
ion-list,
ion-item {
  --padding-start: 0;
  --padding-end: 0;
  --inner-padding-start: 0;
  --inner-padding-end: 0;
}
</style>
