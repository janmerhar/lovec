<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <h3 class="ion-text-center">Zgodovina vplenov</h3>
      <!-- Vplen cards -->

      <!-- 
       Naredi:
       - datum v formatu: "Sobota, 1. 1. 2023" -> computed ali pa funkcija
       -->
      <card-vplen
        lovec="Janez Novak"
        datum="Sobota, 1. 1. 2023"
        vplen="lalalalalla"
      ></card-vplen>
      <card-vplen
        lovec="Jože Gorišek"
        datum="Nedelja, 12. 12. 2021"
        vplen="lalalalalla"
      ></card-vplen>
      <card-vplen
        lovec="Jože Gorišek"
        datum="Nedelja, 12. 12. 2021"
        vplen="lalalalalla"
      ></card-vplen>

      <!-- 
        Implementiraj infinite scroll
        https://ionicframework.com/docs/api/infinite-scroll
       -->
      <fab-button-add @click.prevent="openModalVplenAdd"></fab-button-add>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent, modalController } from "@ionic/vue"

import FabButtonAdd from "@/components/FabButtonAdd.vue"
import CardVplen from "@/components/belezke/CardVplen.vue"

import ModalVplenAdd from "@/components/vplen/ModalVplenAdd.vue"

export default {
  components: {
    IonPage,
    IonContent,
    FabButtonAdd,
    CardVplen,
  },
  methods: {
    async openModalVplenAdd() {
      const modal = await modalController.create({
        component: ModalVplenAdd,
      })
      modal.present()

      // const { data, role } = await modal.onWillDismiss()

      // if (role === "confirm") {
      //   this.message = `Hello, ${data}!`
      // }
    },
  },
}
</script>
