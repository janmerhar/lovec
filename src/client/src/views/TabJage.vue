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
        <card-jaga :jaga="jaga" @click="openModal(ModalJagaDescription)"
          >banana</card-jaga
        >
      </template>

      <fab-button @click.prevent="openModal(ModalJagaAdd)"></fab-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from "@ionic/vue"

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
import { useModal } from "@/composables/useModal"

const jagaStore = useJagaStore()
const { refreshPagination, selectItem } = jagaStore

const { openModal } = useModal()

const buttonColor = (mode: number) => {
  const { selectedItem } = storeToRefs(jagaStore)

  return selectedItem.value === mode ? "tertiary" : "primary"
}

onBeforeMount(async () => {
  await refreshPagination()
})
</script>
