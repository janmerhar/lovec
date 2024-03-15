<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <refresher-component :refresh="refreshPagination"></refresher-component>

      <h3 class="ion-text-center">Dnevniki</h3>
      <template v-for="dnevnik in pripravnikStore.dnevniki" :key="dnevnik.id">
        <card-dnevnik-description :dnevnik="dnevnik"></card-dnevnik-description>
      </template>

      <fab-button-add
        @click.prevent="
          createItem({
            datum: new Date().toISOString(),
            delo: 'drugo',
            opis: 'Nov opis',
            ure: 1,
          })
        "
      ></fab-button-add>

      <infinite-scroll-component
        :scroll="fetchMore"
        v-if="true"
      ></infinite-scroll-component>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { modalController, IonPage, IonContent } from "@ionic/vue"

import { onBeforeMount } from "vue"

import FabButtonAdd from "@/components/FabButtonAdd.vue"
import ModalDnevnikAdd from "@/components/pripravniki/ModalDnevnikAdd.vue"
import CardDnevnikDescription from "@/components/pripravniki/CardDnevnikDescription.vue"
import RefresherComponent from "@/components/ui-components/RefresherComponent.vue"
import InfiniteScrollComponent from "@/components/ui-components/InfiniteScrollComponent.vue"

//
// Nova koda
//

import { usePripravnikDnevnikStore } from "@/stores/usePripravnikDnevnikStore"

const pripravnikStore = usePripravnikDnevnikStore()
const { fetchMore, refreshPagination, createItem } = pripravnikStore

onBeforeMount(async () => {
  await fetchMore()
})

// export default defineComponent({
//   methods: {
//     async openModalPripravnikAdd() {
//       const modal = await modalController.create({
//         component: ModalDnevnikAdd,
//         componentProps: {
//           mentorIme: this.uporabnikStore.mentorIme,
//         },
//       })
//       modal.present()
//     },
</script>
