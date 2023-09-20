<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <h3 class="ion-text-center">Zgodovina vplenov</h3>
      <!-- Vplen cards -->

      <template v-for="vplen in vpleni" :key="new Date(vplen.datum).getTime()">
        <card-vplen
          lovec="Ime dobi iz store-a"
          :datum="vplen.datum"
          :vplen="vplen.zivali"
          @click="openModalVplenDescription(vplen.datum)"
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
import { defineComponent, ref } from "vue"

import FabButtonAdd from "@/components/FabButtonAdd.vue"
import CardVplen from "@/components/vplen/CardVplen.vue"

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
      vpleni: ref<Vplen[]>([]),
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
        await this.fetchVpleni()
      }
    },
    async openModalVplenDescription(datum: string) {
      const modal = await modalController.create({
        component: ModalVplenDescription,
        componentProps: {
          datum: datum,
        },
      })
      modal.present()
    },
    // TODO fix multiple requests
    // that duplicate data
    async fetchVpleni() {
      this.vpleni = []

      for (let i = 0; i < this.stran; i++) {
        const vpleni = await Vplen.fetchVpleni(this.axios, 1)

        this.vpleni = this.vpleni.concat(vpleni.data)
      }

      this.stran += 1
    },
  },
  async beforeMount() {
    await this.fetchVpleni()
  },
})
</script>
