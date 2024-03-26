<template>
  <tab-template :refresh="refreshPagination" :scroll="fetchMore">
    <template #header>
      <tab-header>{{ $t("pripravniki.tab.header") }}</tab-header>
    </template>
    <template #body>
      <TransitionGroup name="list" tag="ul">
        <li v-for="dnevnik in pripravnikStore.dnevniki" :key="dnevnik.id">
          <card-dnevnik-description
            :dnevnik="dnevnik"
          ></card-dnevnik-description>
        </li>
      </TransitionGroup>

      <fab-button-add
        @click.prevent="openModal(ModalDnevnikAdd)"
      ></fab-button-add>
    </template>
  </tab-template>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue"

import FabButtonAdd from "@/components/FabButtonAdd.vue"
import ModalDnevnikAdd from "@/components/pripravniki/ModalDnevnikAdd.vue"
import CardDnevnikDescription from "@/components/pripravniki/CardDnevnikDescription.vue"
import TabTemplate from "@/components/ui-components/tab/TabTemplate.vue"
import TabHeader from "@/components/ui-components/tab/TabHeader.vue"

import { usePripravnikDnevnikStore } from "@/stores/usePripravnikDnevnikStore"
import { useModal } from "@/composables/useModal"

const pripravnikStore = usePripravnikDnevnikStore()
const { fetchMore, refreshPagination } = pripravnikStore
const { openModal } = useModal()

onBeforeMount(async () => {
  await fetchMore()
})
</script>
