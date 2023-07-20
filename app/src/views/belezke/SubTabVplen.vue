<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <h3 class="ion-text-center">Zgodovina vplenov</h3>
      <!-- Vplen cards -->

      <!-- 
       Naredi:
       - datum v formatu: "Sobota, 1. 1. 2023" -> computed ali pa funkcija
       -->

      <template v-for="vplen in vpleni" :key="vplen.datum">
        <card-vplen
          lovec="Ime dobi iz store-a"
          :datum="vplen.datum"
          :vplen="vplen.zivali"
          @click="openModalVplenDescription"
        ></card-vplen>
      </template>

      <!-- TODO
        Implementiraj infinite scroll
        https://ionicframework.com/docs/api/infinite-scroll
       -->
      <fab-button-add @click.prevent="openModalVplenAdd"></fab-button-add>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent, modalController } from "@ionic/vue"
import { defineComponent } from "vue"

import FabButtonAdd from "@/components/FabButtonAdd.vue"
import CardVplen from "@/components/belezke/CardVplen.vue"

import ModalVplenAdd from "@/components/vplen/ModalVplenAdd.vue"
import ModalVplenDescription from "@/components/vplen/ModalVplenDescription.vue"

import { Vplen } from "@/entities/Vplen"

export default defineComponent({
  components: {
    IonPage,
    IonContent,
    FabButtonAdd,
    CardVplen,
  },
  data() {
    return {
      vpleni: [],
      stran: 1,
    }
  },
  methods: {
    async openModalVplenAdd() {
      const modal = await modalController.create({
        component: ModalVplenAdd,
      })
      modal.present()

      const { role } = await modal.onWillDismiss()

      if (role === "confirm") {
        // this.message = `Hello, ${data}!`
        // posodobim podatke
      }
    },
    async openModalVplenDescription() {
      const modal = await modalController.create({
        component: ModalVplenDescription,
      })
      modal.present()
    },
    async fetchVpleni() {
      if (this.stran == 1) {
        this.vpleni = []
      }

      const vpleni = await Vplen.fetchVpleni(1)
      this.stran += 1

      this.vpleni = this.vpleni.concat(vpleni.data)
    },
  },
  async beforeMount() {
    Vplen.setCustomAxios(this.axios)
    await this.fetchVpleni()
  },
})
</script>
