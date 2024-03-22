<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <refresher-component :refresh="refreshPagination"></refresher-component>
      <h3 class="ion-text-center">Evidenca opreme</h3>

      <template v-for="elOprema in opremaStore.oprema" :key="elOprema.id">
        <card-oprema
          :oprema="elOprema"
          @izbrisi="deleteItem(elOprema)"
        ></card-oprema>
      </template>

      <fab-button-add
        @click.prevent="openModal(ModalOpremaAdd)"
      ></fab-button-add>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from "@ionic/vue"

import { onBeforeMount } from "vue"

import FabButtonAdd from "@/components/FabButtonAdd.vue"
import CardOprema from "@/components/oprema/CardOprema.vue"
import RefresherComponent from "@/components/ui-components/RefresherComponent.vue"
import ModalOpremaAdd from "@/components/oprema/ModalOpremaAdd.vue"

import { useOpremaStore } from "@/stores/useOpremaStore"
import { useModal } from "@/composables/useModal"

const opremaStore = useOpremaStore()
const { fetchMore, refreshPagination, deleteItem } = opremaStore
const { openModal } = useModal()

onBeforeMount(async () => {
  await fetchMore()
})
</script>
