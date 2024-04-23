<template>
  <tab-template :refresh="refreshPagination">
    <template #header>
      <tab-header>{{ $t("oprema.tab.header") }}</tab-header>
    </template>
    <template #body>
      <TransitionGroup name="list" tag="ul">
        <li v-for="elOprema in oprema" :key="elOprema.id">
          <card-oprema
            :oprema="elOprema"
            @izbrisi="deleteItem(elOprema)"
          ></card-oprema>
        </li>
      </TransitionGroup>

      <tab-no-elements :elements="oprema"></tab-no-elements>

      <fab-button-add
        @click.prevent="openModal(ModalOpremaAdd)"
      ></fab-button-add>
    </template>
  </tab-template>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue"

import FabButtonAdd from "@/components/FabButtonAdd.vue"
import CardOprema from "@/components/oprema/CardOprema.vue"
import ModalOpremaAdd from "@/components/oprema/ModalOpremaAdd.vue"
import TabTemplate from "@/components/ui-components/tab/TabTemplate.vue"
import TabHeader from "@/components/ui-components/tab/TabHeader.vue"
import TabNoElements from "@/components/ui-components/tab/TabNoElements.vue"

import { useOpremaStore } from "@/stores/useOpremaStore"
import { useModal } from "@/composables/useModal"
import { storeToRefs } from "pinia"

const opremaStore = useOpremaStore()
const { fetchMore, refreshPagination, deleteItem } = opremaStore
const { oprema } = storeToRefs(opremaStore)
const { openModal } = useModal()

onBeforeMount(async () => {
  await fetchMore()
})
</script>
