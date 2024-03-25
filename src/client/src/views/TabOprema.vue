<template>
  <tab-template :refresh="refreshPagination">
    <template #header>
      <tab-header> asdfl;jasfd</tab-header>
    </template>
    <template #body>
      <template v-for="elOprema in opremaStore.oprema" :key="elOprema.id">
        <card-oprema
          :oprema="elOprema"
          @izbrisi="deleteItem(elOprema)"
        ></card-oprema>
      </template>
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

import { useOpremaStore } from "@/stores/useOpremaStore"
import { useModal } from "@/composables/useModal"

const opremaStore = useOpremaStore()
const { fetchMore, refreshPagination, deleteItem } = opremaStore
const { openModal } = useModal()

onBeforeMount(async () => {
  await fetchMore()
})
</script>
