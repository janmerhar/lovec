<template>
  <tab-template :refresh="refreshPagination" :scroll="fetchMore">
    <template #header>
      <tab-header>{{ $t("vpleni.tab.header") }}</tab-header>
    </template>
    <template #body>
      <TransitionGroup name="list" tag="ul">
        <li
          v-for="vplen in vpleniDetails"
          :key="new Date(vplen.datum).getTime()"
        >
          <card-vplen-details
            :vplen="vplen"
            @click="redirectTo('vplen_id', { id: vplen.datum })"
          ></card-vplen-details>
        </li>
      </TransitionGroup>

      <tab-no-elements :elements="vpleniDetails"></tab-no-elements>

      <fab-button-add
        @click.prevent="openModal(ModalVplenAdd)"
      ></fab-button-add>
    </template>
  </tab-template>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue"

import FabButtonAdd from "@/components/FabButtonAdd.vue"
import CardVplenDetails from "@/components/vplen/CardVplenDetails.vue"

import ModalVplenAdd from "@/components/vplen/ModalVplenAdd.vue"
import TabTemplate from "@/components/ui-components/tab/TabTemplate.vue"
import TabHeader from "@/components/ui-components/tab/TabHeader.vue"
import TabNoElements from "@/components/ui-components/tab/TabNoElements.vue"

import { useVplenDetailsStore } from "@/stores/useVplenDetailsStore"

const vplenDetailsStore = useVplenDetailsStore()
const { fetchMore, refreshPagination } = vplenDetailsStore
const { vpleniDetails } = storeToRefs(vplenDetailsStore)

onBeforeMount(async () => {
  await fetchMore()
})

import { useModal } from "@/composables/useModal"

const { openModal } = useModal()
import { useTabNavigation } from "@/composables/useTabNavigation"
import { storeToRefs } from "pinia"
const { redirectTo } = useTabNavigation()
</script>
