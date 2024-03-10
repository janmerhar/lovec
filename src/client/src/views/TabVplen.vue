<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <refresher-component :refresh="refresh"></refresher-component>

      <h3 class="ion-text-center">Zgodovina vplenov</h3>
      <!-- Vplen cards -->

      <template
        v-for="vplen in vplenDetailsStore.vpleniDetails"
        :key="new Date(vplen.datum).getTime()"
      >
        <card-vplen
          lovec="Ime dobi iz store-a"
          :vplen="vplen"
          @click="openModalVplenDescription(vplen)"
        ></card-vplen>
      </template>

      <!-- TODO
        Implementiraj infinite scroll
        https://ionicframework.com/docs/api/infinite-scroll
       -->
      <fab-button-add @click.prevent=""></fab-button-add>

      <infinite-scroll-component
        :scroll="fetchMore"
      ></infinite-scroll-component>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, modalController } from "@ionic/vue"
import { onBeforeMount } from "vue"

import FabButtonAdd from "@/components/FabButtonAdd.vue"
import CardVplen from "@/components/vplen/CardVplen.vue"

import ModalVplenAdd from "@/components/vplen/ModalVplenAdd.vue"
import ModalVplenDescription from "@/components/vplen/ModalVplenDescription.vue"
import RefresherComponent from "@/components/ui-components/RefresherComponent.vue"
import InfiniteScrollComponent from "@/components/ui-components/InfiniteScrollComponent.vue"

import type { VplenDetails } from "@/types"

import { useVplenDetailsStore } from "@/stores/useVplenDetailsStore"

const vplenDetailsStore = useVplenDetailsStore()
const { fetchMore, refreshPagination } = vplenDetailsStore

const refresh = async (event: CustomEvent) => {
  await refreshPagination()
  event.detail.complete()
}

const openModalVplenDescription = async (selection: VplenDetails) => {
  const modal = await modalController.create({
    component: ModalVplenDescription,
    componentProps: {
      selection: selection,
    },
  })
  modal.present()
}

onBeforeMount(async () => {
  await fetchMore()
})
</script>
