<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <refresher-component :refresh="refresh"></refresher-component>

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

      <infinite-scroll-component :scroll="scroll"></infinite-scroll-component>
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
import RefresherComponent from "@/components/ui-components/RefresherComponent.vue"
import InfiniteScrollComponent from "@/components/ui-components/InfiniteScrollComponent.vue"

import { Vplen } from "@/entities/Vplen"

export default defineComponent({
  components: {
    IonPage,
    IonContent,
    FabButtonAdd,
    CardVplen,
    RefresherComponent,
    InfiniteScrollComponent,
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

    async fetchVpleni() {
      const concatVpleni: Vplen[] = []

      for (let i = 1; i <= this.stran; i++) {
        const vpleni = await Vplen.fetchVpleni(this.axios, i)

        concatVpleni.push(...vpleni.data)
      }

      this.vpleni = [...new Set(concatVpleni)]
    },

    async fetchVpleniNextPage() {
      this.stran += 1

      const vpleni = await Vplen.fetchVpleni(this.axios, this.stran)

      if (vpleni.data.length === 0) {
        this.stran = Math.max(this.stran - 1, 1)
        return
      }

      this.vpleni.push(...vpleni.data)
      this.vpleni = [...new Set(this.vpleni)]
    },

    async refresh(event: CustomEvent) {
      await this.fetchVpleni()
      event.detail.complete()
    },

    async scroll() {
      console.log("scroll")
      await this.fetchVpleniNextPage()
    },
  },
  async beforeMount() {
    await this.fetchVpleni()
  },
})
</script>
