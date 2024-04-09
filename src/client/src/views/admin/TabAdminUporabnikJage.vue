<template>
  <tab-template :refresh="refreshPagination" :scroll="fetchMore">
    <template #header>
      <tab-header>
        {{ $t("admin_uporabnik_jage.tab.header") }} {{ uporabnik?.ime }}
        {{ uporabnik?.priimek }}
      </tab-header>
    </template>
    <template #body>
      <inline-select-category>
        <inline-select-button :color="buttonColor(1)" @click="selectItem(1)">{{
          $t("admin_uporabnik_jage.tab.headerOptions.active")
        }}</inline-select-button>
        <inline-select-button :color="buttonColor(2)" @click="selectItem(2)">{{
          $t("jaga.tab.headerOptions.past")
        }}</inline-select-button>
      </inline-select-category>

      <TransitionGroup name="list" tag="ul">
        <li v-for="jaga in items" :key="jaga.id">
          <!-- TODO: open jaga in normal view of admin -->
          <card-jaga :jaga="jaga"></card-jaga>
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
import { useUporabnikJageStore } from "@/stores/admin/useUporabnikJageStore"

import TabTemplate from "@/components/ui-components/tab/TabTemplate.vue"
import TabHeader from "@/components/ui-components/tab/TabHeader.vue"
import TabNoElements from "@/components/ui-components/tab/TabNoElements.vue"
import CardJaga from "@/components/CardJaga.vue"
import InlineSelectCategory from "@/components/jage/InlineSelectCategory.vue"
import InlineSelectButton from "@/components/jage/InlineSelectButton.vue"

const uporabnikStore = useUporabnikiStore()
const { selectedItem: uporabnik } = storeToRefs(uporabnikStore)

const uporabnikJagaStore = useUporabnikJageStore()
const { fetchMore, refreshPagination, selectItem } = uporabnikJagaStore
const { items } = storeToRefs(uporabnikJagaStore)

onBeforeMount(async () => {
  await fetchMore()
})

const buttonColor = (mode: number) => {
  const { selectedItem } = storeToRefs(uporabnikJagaStore)

  return selectedItem.value === mode ? "tertiary" : "primary"
}
</script>
