<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <refresher-component :refresh="refreshPagination"></refresher-component>

      <h3 class="ion-text-center">Dnevniki</h3>
      <template v-for="dnevnik in pripravnikStore.dnevniki" :key="dnevnik.id">
        <card-dnevnik-description :dnevnik="dnevnik"></card-dnevnik-description>
      </template>

      <fab-button-add
        @click.prevent="openModal(ModalDnevnikAdd)"
      ></fab-button-add>

      <infinite-scroll-component
        :scroll="fetchMore"
        v-if="true"
      ></infinite-scroll-component>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from "@ionic/vue"

import { onBeforeMount } from "vue"

import FabButtonAdd from "@/components/FabButtonAdd.vue"
import ModalDnevnikAdd from "@/components/pripravniki/ModalDnevnikAdd.vue"
import CardDnevnikDescription from "@/components/pripravniki/CardDnevnikDescription.vue"
import RefresherComponent from "@/components/ui-components/RefresherComponent.vue"
import InfiniteScrollComponent from "@/components/ui-components/InfiniteScrollComponent.vue"

import { usePripravnikDnevnikStore } from "@/stores/usePripravnikDnevnikStore"
import { useModal } from "@/composables/useModal"

const pripravnikStore = usePripravnikDnevnikStore()
const { fetchMore, refreshPagination } = pripravnikStore
const { openModal } = useModal()

onBeforeMount(async () => {
  await fetchMore()
})
</script>
