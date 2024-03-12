<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <refresher-component :refresh="refreshPagination"></refresher-component>

      <ion-button @click="updateItemPotrjen(mentorStore.dnevniki[0])"
        >update dnevnik</ion-button
      >
      <ion-button @click="selectItem('2019-01-02')">change datum</ion-button>

      <!-- Pripravnik -->
      <h3 class="ion-text-center">Dnevniki</h3>
      <!--  -->
      <template v-for="dnevnik in mentorStore.dnevniki" :key="dnevnik.id">
        <card-dnevnik-description
          :subtitle="'Mentor '"
          :title="dnevnik.datum"
          :showButtons="true"
          :dnevnik="dnevnik"
        ></card-dnevnik-description>
      </template>
      <!--  -->

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

import CardDnevnikDescription from "@/components/pripravniki/CardDnevnikDescription.vue"
import RefresherComponent from "@/components/ui-components/RefresherComponent.vue"
import InfiniteScrollComponent from "@/components/ui-components/InfiniteScrollComponent.vue"

//
// Nova koda
//

import { useMentorDnevnikStore } from "@/stores/useMentorDnevnikStore"

const mentorStore = useMentorDnevnikStore()
const { fetchMore, refreshPagination, updateItemPotrjen, selectItem } =
  mentorStore

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
