<template>
  <tab-template :refresh="refreshPagination">
    <template #header>
      <tab-header>{{ $t("jaga.tab.header") }}</tab-header>
    </template>
    <template #body>
      <inline-select-category>
        <inline-select-button :color="buttonColor(1)" @click="selectItem(1)">{{
          $t("jaga.tab.headerOptions.active")
        }}</inline-select-button>
        <inline-select-button :color="buttonColor(2)" @click="selectItem(2)">{{
          $t("jaga.tab.headerOptions.past")
        }}</inline-select-button>
        <inline-select-button :color="buttonColor(3)" @click="selectItem(3)">{{
          $t("jaga.tab.headerOptions.mine")
        }}</inline-select-button>
      </inline-select-category>

      <template v-for="jaga in jagaStore.jage" :key="jaga.id">
        <card-jaga :jaga="jaga" @click="openModal(ModalJagaDescription)"
          >banana</card-jaga
        >
      </template>

      <fab-button @click.prevent="openModal(ModalJagaAdd)"></fab-button>
    </template>
  </tab-template>
</template>

<script setup lang="ts">
import FabButton from "@/components/FabButtonAdd.vue"
import CardJaga from "@/components/CardJaga.vue"
import ModalJagaAdd from "@/components/ModalJagaAdd.vue"
import ModalJagaDescription from "@/components/ModalJagaDescription.vue"
import InlineSelectCategory from "@/components/jage/InlineSelectCategory.vue"
import InlineSelectButton from "@/components/jage/InlineSelectButton.vue"
import TabTemplate from "@/components/ui-components/tab/TabTemplate.vue"
import TabHeader from "@/components/ui-components/tab/TabHeader.vue"

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
