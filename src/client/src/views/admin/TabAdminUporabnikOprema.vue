<template>
  <tab-template :refresh="refreshPagination" :scroll="fetchMore">
    <template #header>
      <tab-header>
        {{ $t("admin_uporabnik_oprema.tab.header") }} {{ uporabnik?.ime }}
        {{ uporabnik?.priimek }}
      </tab-header>
    </template>
    <template #body>
      <TransitionGroup name="list" tag="ul">
        <li v-for="el in items" :key="el.id">
          <card-oprema :oprema="el" @izbrisi="deleteItem(el)"></card-oprema>
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
import { useUporabnikOpremaStore } from "@/stores/admin/useUporabnikOpremaStore"

import TabTemplate from "@/components/ui-components/tab/TabTemplate.vue"
import TabHeader from "@/components/ui-components/tab/TabHeader.vue"
import TabNoElements from "@/components/ui-components/tab/TabNoElements.vue"
import CardOprema from "@/components/oprema/CardOprema.vue"

const uporabnikStore = useUporabnikiStore()
const { selectedItem: uporabnik } = storeToRefs(uporabnikStore)

const uporabnikOpremaStore = useUporabnikOpremaStore()
const { fetchMore, refreshPagination, deleteItem } = uporabnikOpremaStore
const { items } = storeToRefs(uporabnikOpremaStore)

onBeforeMount(async () => {
  await fetchMore()
})
</script>
