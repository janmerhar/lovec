<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-button @click="selectItem(1)">select 1</ion-button>
      <ion-button @click="selectItem(2)">select 2</ion-button>
      <ion-button @click="selectItem(3)">select 3</ion-button>

      <refresher-component :refresh="refreshPagination"></refresher-component>

      <template v-for="jaga in jagaStore.jage" :key="jaga.id">
        <card-jaga :jaga="jaga">banana</card-jaga>
      </template>

      <fab-button @click.prevent="() => {}"></fab-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, modalController, IonButton } from "@ionic/vue"

import FabButton from "@/components/FabButtonAdd.vue"
import CardJaga from "@/components/CardJaga.vue"
import ModalJagaAdd from "@/components/ModalJagaAdd.vue"
import ModalJagaDescription from "@/components/ModalJagaDescription.vue"
import RefresherComponent from "@/components/ui-components/RefresherComponent.vue"

import { useJagaStore } from "@/stores/useJagaStore"
import { onBeforeMount } from "vue"

const jagaStore = useJagaStore()
const { refreshPagination, selectItem } = jagaStore

onBeforeMount(async () => {
  await refreshPagination()
})

// export default defineComponent({
//   methods: {
//     async openModalJagaAdd() {
//       console.warn("click ModalJagaAdd")
//       const modal = await modalController.create({
//         component: ModalJagaAdd,
//       })
//       modal.present()

//       const { data, role } = await modal.onWillDismiss()

//       if (role === "confirm") {
//         this.message = `Hello, ${data}!`
//       }
//     },

//     async openModalJagaDescription() {
//       console.warn("click ModalJagaDescription ")
//       const modal = await modalController.create({
//         component: ModalJagaDescription,
//       })
//       modal.dismiss()
//       modal.present()

//       const { data, role } = await modal.onWillDismiss()

//       if (role === "confirm") {
//         this.message = `Hello, ${data}!`
//       }
//     },
//   },
// })
</script>
