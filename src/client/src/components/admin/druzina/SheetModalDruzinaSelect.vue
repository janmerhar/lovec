<template>
  <sheet-modal-template :scroll="fetchMore">
    <template #header>
      <sheet-modal-header>
        {{ $t("admin_revir.crud.categories.druzina") }}
      </sheet-modal-header>
    </template>

    <!--  -->
    <template #body>
      <list-container>
        <template #default>
          <list-item
            v-for="druzina in druzine"
            :key="druzina.id"
            @click="
              () => {
                selectItem(druzina)
                cancelModal()
              }
            "
          >
            <template #title>
              {{ druzina.ime }}
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

import { useDruzineStore } from "@/stores/admin/useDruzineStore"
import { useModal } from "@/composables/useModal"
import { storeToRefs } from "pinia"

const druzineStore = useDruzineStore()
const { fetchMore, selectItem } = druzineStore
const { druzine } = storeToRefs(druzineStore)
const { cancelModal } = useModal()

onBeforeMount(async () => {
  await fetchMore()
})
</script>
