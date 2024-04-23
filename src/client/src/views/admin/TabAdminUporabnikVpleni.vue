<template>
  <tab-template :refresh="refreshPagination" :scroll="fetchMore">
    <template #header>
      <tab-header>
        {{ $t("admin_uporabnik_vpleni.tab.header") }} {{ uporabnik?.ime }}
        {{ uporabnik?.priimek }}
      </tab-header>
    </template>
    <template #body>
      <TransitionGroup
        name="list"
        tag="ul"
        v-for="vplen in items"
        :key="vplen.datum"
      >
        <li>
          <card-vplen-details :vplen="vplen"> </card-vplen-details>
        </li>
      </TransitionGroup>

      <tab-no-elements :elements="items"></tab-no-elements>
    </template>
  </tab-template>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue"
import { useUporabnikiStore } from "@/stores/admin/useUporabnikiStore"
import { storeToRefs } from "pinia"
import { useUporabnikVpleniStore } from "@/stores/admin/useUporabnikVpleniStore"

import TabTemplate from "@/components/ui-components/tab/TabTemplate.vue"
import TabHeader from "@/components/ui-components/tab/TabHeader.vue"
import TabNoElements from "@/components/ui-components/tab/TabNoElements.vue"
import CardVplenDetails from "@/components/vplen/CardVplenDetails.vue"

const uporabnikStore = useUporabnikiStore()
const { selectedItem: uporabnik } = storeToRefs(uporabnikStore)

const uporabniVpleniStore = useUporabnikVpleniStore()
const { fetchMore, refreshPagination } = uporabniVpleniStore
const { items } = storeToRefs(uporabniVpleniStore)

onBeforeMount(async () => {
  console.log("banana")
  await fetchMore()
})
</script>
