<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <refresher-component :refresh="refreshPagination"></refresher-component>
      <!--  -->
      <h3 class="ion-text-center">Evidenca opreme</h3>
      <!--  -->

      <template v-for="elOprema in opremaStore.oprema" :key="elOprema.id">
        <card-oprema
          :oprema="elOprema"
          @izbrisi="(oprema: Oprema) => deleteItem(oprema)"
        ></card-oprema>
      </template>
      <!--  -->
      <fab-button-add
        @click.prevent='
          () => {
            createItem({
              tip: "drugo",
              naziv: "Nova oprema",
              stanje: "Novo",
              datum: new Date().toISOString(),
            } as Oprema)
          }
        '
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

import { useOpremaStore } from "@/stores/useOpremaStore"
import type { Oprema } from "@/types"

const opremaStore = useOpremaStore()
const { fetchMore, refreshPagination, createItem, deleteItem } = opremaStore

onBeforeMount(async () => {
  await fetchMore()
})
</script>
