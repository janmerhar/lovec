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

      <TransitionGroup name="list" tag="ul">
        <li v-for="jaga in jage" :key="jaga.id">
          <card-jaga
            :jaga="jaga"
            @click="
              () => {
                selectJaga(jaga)
                openModal(ModalJagaDescription)
              }
            "
          ></card-jaga>
        </li>
      </TransitionGroup>

      <tab-no-elements :elements="jage"></tab-no-elements>

      <fab-button @click.prevent="openModal(ModalJagaAdd)"></fab-button>
    </template>
  </tab-template>
</template>

<script setup lang="ts">
import FabButton from "@/components/FabButtonAdd.vue"
import CardJaga from "@/components/CardJaga.vue"
import ModalJagaAdd from "@/components/jage/ModalJagaAdd.vue"
import ModalJagaDescription from "@/components/jage/ModalJagaDescription.vue"
import InlineSelectCategory from "@/components/jage/InlineSelectCategory.vue"
import InlineSelectButton from "@/components/jage/InlineSelectButton.vue"
import TabTemplate from "@/components/ui-components/tab/TabTemplate.vue"
import TabHeader from "@/components/ui-components/tab/TabHeader.vue"
import TabNoElements from "@/components/ui-components/tab/TabNoElements.vue"

import { useJagaStore } from "@/stores/useJagaStore"
import { onBeforeMount } from "vue"
import { storeToRefs } from "pinia"
import { useModal } from "@/composables/useModal"

const jagaStore = useJagaStore()
const { refreshPagination, selectItem, selectJaga } = jagaStore
const { jage } = storeToRefs(jagaStore)

const { openModal } = useModal()

const buttonColor = (mode: number) => {
  const { selectedItem } = storeToRefs(jagaStore)

  return selectedItem.value === mode ? "tertiary" : "primary"
}

onBeforeMount(async () => {
  await refreshPagination()
})
</script>
