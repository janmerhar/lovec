<template>
  <tab-template :refresh="refreshPagination" :scroll="fetchMore">
    <template #header>
      <tab-header>
        {{ $t("admin_pripravnik_dnevniki.tab.header") }} {{ uporabnik?.ime }}
        {{ uporabnik?.priimek }}
      </tab-header>
    </template>
    <template #body>
      <TransitionGroup name="list" tag="ul">
        <li v-for="el in items" :key="el.id">
          <card-dnevnik-description :dnevnik="el"></card-dnevnik-description>
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
import { usePripravnikDnevnikiStore } from "@/stores/admin/usePripravnikDnevnikiStore"

import TabTemplate from "@/components/ui-components/tab/TabTemplate.vue"
import TabHeader from "@/components/ui-components/tab/TabHeader.vue"
import TabNoElements from "@/components/ui-components/tab/TabNoElements.vue"
import CardDnevnikDescription from "@/components/pripravniki/CardDnevnikDescription.vue"

const uporabnikStore = useUporabnikiStore()
const { selectedItem: uporabnik } = storeToRefs(uporabnikStore)

const uporabnikDnevnikStore = usePripravnikDnevnikiStore()
const { fetchMore, refreshPagination } = uporabnikDnevnikStore
const { items } = storeToRefs(uporabnikDnevnikStore)

onBeforeMount(async () => {
  await fetchMore()
})
</script>
