<template>
  <ion-page>
    <ion-content>
      <inline-select-category>
        <inline-select-button :color="buttonColor(1)" @click="selectItem(1)"
          >AKTIVNE</inline-select-button
        >
        <inline-select-button :color="buttonColor(2)" @click="selectItem(2)"
          >PRETEKLE</inline-select-button
        >
        <inline-select-button :color="buttonColor(3)" @click="selectItem(3)"
          >MOJE</inline-select-button
        >
      </inline-select-category>

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
import InlineSelectCategory from "@/components/jage/InlineSelectCategory.vue"
import InlineSelectButton from "@/components/jage/InlineSelectButton.vue"

import { useJagaStore } from "@/stores/useJagaStore"
import { onBeforeMount } from "vue"
import { storeToRefs } from "pinia"

const jagaStore = useJagaStore()
const { refreshPagination, selectItem } = jagaStore

const buttonColor = (mode: number) => {
  const { selectedItem } = storeToRefs(jagaStore)

  return selectedItem.value === mode ? "tertiary" : "primary"
}

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
