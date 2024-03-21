<template>
  <ion-page>
    <ion-content>
      <refresher-component :refresh="refresh"></refresher-component>

      <h3 class="ion-text-center">Zgodovina vplenov</h3>
      <!-- Vplen cards -->

      <template
        v-for="vplen in vplenDetailsStore.vpleniDetails"
        :key="new Date(vplen.datum).getTime()"
      >
        <card-vplen-details
          :vplen="vplen"
          @click="redirectTo('vplen_id', { id: vplen.datum })"
        ></card-vplen-details>
      </template>

      <fab-button-add
        @click.prevent="openModal(ModalVplenAdd)"
      ></fab-button-add>

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
import CardVplenDetails from "@/components/vplen/CardVplenDetails.vue"

import ModalVplenAdd from "@/components/vplen/ModalVplenAdd.vue"
import RefresherComponent from "@/components/ui-components/RefresherComponent.vue"
import InfiniteScrollComponent from "@/components/ui-components/InfiniteScrollComponent.vue"

import { useVplenDetailsStore } from "@/stores/useVplenDetailsStore"

const vplenDetailsStore = useVplenDetailsStore()
const { fetchMore, refreshPagination } = vplenDetailsStore

const refresh = async (event: CustomEvent) => {
  await refreshPagination()
  event.detail.complete()
}

onBeforeMount(async () => {
  await fetchMore()
})

import { useModal } from "@/composables/useModal"

const { openModal } = useModal()
import { useTabNavigation } from "@/composables/useTabNavigation"
const { redirectTo } = useTabNavigation()
</script>
