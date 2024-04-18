<template>
  <sheet-modal-template :scroll="fetchMore">
    <template #header>
      <sheet-modal-header>
        {{ $t("admin_uporabniki.tab.header") }}
      </sheet-modal-header>
    </template>

    <!--  -->
    <template #body>
      <list-container>
        <template #default>
          <list-item
            v-for="uporabnik in uporabniki"
            :key="uporabnik.id"
            @click="
              () => {
                selectItem(uporabnik)
                cancelModal()
              }
            "
          >
            <template #title> {{ uporabnik.role }}</template>
            <template #value>
              {{ uporabnik.ime }}
              {{ uporabnik.priimek }}
            </template>
          </list-item>
        </template>
      </list-container>
    </template>
    <!--  -->
  </sheet-modal-template>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue"

import SheetModalTemplate from "@/components/ui-components/modal/SheetModalTemplate.vue"
import SheetModalHeader from "@/components/ui-components/modal/SheetModalHeader.vue"
import ListContainer from "@/components/ui-components/list/ListContainer.vue"
import ListItem from "@/components/ui-components/list/ListItem.vue"

import { useSearchUporabnikiStore } from "@/stores/useSearchUporabnikiStore"
import { useModal } from "@/composables/useModal"
import { storeToRefs } from "pinia"

const searchUporabnikStore = useSearchUporabnikiStore()
const { fetchMore, selectItem } = searchUporabnikStore
const { uporabniki } = storeToRefs(searchUporabnikStore)
const { cancelModal } = useModal()

onBeforeMount(async () => {
  await fetchMore()
})
</script>
