<template>
  <tab-template :scroll="fetchMore" :refresh="refreshPagination">
    <template #header>
      <tab-header>{{ $t("vplenDatum.tab.header") }}</tab-header>
    </template>
    <template #body>
      <TransitionGroup name="list" tag="ul">
        <li v-for="vplen in vpleni" :key="vplen.id">
          <card-vplen-description
            :vplen="vplen"
            @izbrisi="deleteItem(vplen)"
          ></card-vplen-description>
        </li>
      </TransitionGroup>

      <tab-no-elements :elements="vpleni"></tab-no-elements>

      <fab-button-add
        @click.prevent="openModal(ModalVplenAdd)"
      ></fab-button-add>
    </template>
  </tab-template>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue"

import FabButtonAdd from "@/components/FabButtonAdd.vue"
import CardVplenDescription from "@/components/vplen/CardVplenDescription.vue"
import TabTemplate from "@/components/ui-components/tab/TabTemplate.vue"
import TabHeader from "@/components/ui-components/tab/TabHeader.vue"

import ModalVplenAdd from "@/components/vplen/ModalVplenAdd.vue"
import TabNoElements from "@/components/ui-components/tab/TabNoElements.vue"

import { useVplenStore } from "@/stores/useVplenStore"
import { useRoute } from "vue-router"
import { useVplenDetailsStore } from "@/stores/useVplenDetailsStore"
import { useModal } from "@/composables/useModal"
import { useTabNavigation } from "@/composables/useTabNavigation"
import { storeToRefs } from "pinia"
const { openModal } = useModal()

const vplenDetailsStore = useVplenDetailsStore()
const vplenStore = useVplenStore()

const { setVplenDetails, refreshPagination, fetchMore, deleteItem } = vplenStore
const { vpleni } = storeToRefs(vplenStore)

const route = useRoute()

onBeforeMount(async () => {
  const id = route.params.id

  const selectedVplen = vplenDetailsStore.vpleniDetails.filter(
    (vplen) => vplen.datum === id
  )[0]

  if (!selectedVplen) {
    useTabNavigation().redirectTo("vpleni")
    return
  }

  await setVplenDetails(selectedVplen)
})
</script>
