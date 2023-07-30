<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <map-component></map-component>

      <div class="ion-padding">
        <h4 class="ion-text-center">Podrobnosti o izbrani opazovalnici</h4>
        <br />
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
        voluptates nostrum odit minima sunt ipsa, laboriosam voluptate aut,
      </div>
      <div class="ion-padding">
        <ion-button expand="full"
          >Rezerviraj / vstopi v opazovalnico</ion-button
        >
        <ion-button expand="full">Ogled zgodovine zasedenosti</ion-button>
        <ion-button color="primary" expand="full"
          >Zaključi obisk opazovalnice</ion-button
        >
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
} from "@ionic/vue"

import { defineComponent } from "vue"

import MapComponent from "@/components/MapComponent.vue"

import { Opazovalnica } from "@/entities/Opazovalnica"

export default defineComponent({
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    MapComponent,
  },
  data() {
    return {
      opazovalnice: [],
      izbranaOpazovalnica: null,
    }
  },
  methods: {},
  async beforeMount() {
    Opazovalnica.setCustomAxios(this.axios)

    const result = await Opazovalnica.fetchOpazovalnice()
    this.opazovalnice = result.data
  },
})
</script>
