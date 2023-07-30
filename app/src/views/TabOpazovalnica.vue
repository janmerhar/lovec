<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <!-- 
        // TODO
        tukaj lahko na vrhu dam se eno opozorilo oz gumb,
        ki uporabniku sporoca, da ima aktivno rezervacijo
       -->
      <div class="ion-padding">
        <ion-button color="danger" expand="full">
          Zaključi obisk opazovalnice
        </ion-button>
      </div>

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
        <div class="ion-padding">
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
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
          voluptates nostrum odit minima sunt ipsa, laboriosam voluptate aut,
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic
          consectetur illo totam aut, neque, sit labore ea cumque sed facere
          unde! Culpa illum quaerat dolores, dolorum necessitatibus ex
          praesentium iusto.
        </div>
        <div class="ion-padding">
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

<script lang="ts">
import { IonPage, IonContent, IonButton, modalController } from "@ionic/vue"

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
      this.izbranaOpazovalnica = this.opazovalnice[index]
    },
    async openModalOpazovanilnicaRezerviraj() {
      const modal = await modalController.create({
        component: ModalOpazovalnicaRezerviraj,
        componentProps: {
          id: this.izbranaOpazovalnica.id,
        },
      })
      modal.present()
    },
  },
  async beforeMount() {
    Opazovalnica.setCustomAxios(this.axios)

    const result = await Opazovalnica.fetchOpazovalnice()
    this.opazovalnice = result.data
  },
})
</script>
