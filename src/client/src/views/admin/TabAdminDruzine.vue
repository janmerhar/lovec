<template>
  <tab-template :refresh="refreshPagination" :scroll="fetchMore">
    <template #header>
      <tab-header>{{ $t("admin_druzine.tab.header") }}</tab-header>
    </template>
    <template #body>
      <TransitionGroup name="list" tag="ul">
        <li v-for="elDruzina in druzine" :key="elDruzina.id">
          <card-druzina-details :druzina="elDruzina"></card-druzina-details>
        </li>
      </TransitionGroup>

      <tab-no-elements :elements="druzine"></tab-no-elements>

      <fab-button-add
        @click.prevent="openModal(ModalDruzinaAdd)"
      ></fab-button-add>
    </template>
  </tab-template>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue"

import FabButtonAdd from "@/components/FabButtonAdd.vue"
import CardDruzinaDetails from "@/components/admin/druzina/CardDruzinaDetails.vue"
import TabTemplate from "@/components/ui-components/tab/TabTemplate.vue"
import TabHeader from "@/components/ui-components/tab/TabHeader.vue"
import TabNoElements from "@/components/ui-components/tab/TabNoElements.vue"
import ModalDruzinaAdd from "@/components/admin/druzina/ModalDruzinaAdd.vue"

import { useDruzineStore } from "@/stores/admin/useDruzineStore"
import { useModal } from "@/composables/useModal"
import { storeToRefs } from "pinia"

const druzineStore = useDruzineStore()
const { fetchMore, refreshPagination } = druzineStore
const { druzine } = storeToRefs(druzineStore)
const { openModal } = useModal()

onBeforeMount(async () => {
  await fetchMore()
})
</script>
