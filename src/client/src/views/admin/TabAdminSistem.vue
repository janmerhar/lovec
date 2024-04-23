<template>
  <tab-template :refresh="refreshPagination" :scroll="fetchMore">
    <template #header>
      <tab-header>{{ $t("admin_sistem.tab.header") }}</tab-header>
    </template>
    <template #body>
      <list-container>
        <template #title>
          <list-title>
            <template #default>
              {{ $t("admin_sistem.tab.sections.spremenljivke") }}
            </template>
            <template #end>
              <!-- INLINE UPDATE KREIRAJ KOMPONENTO -->
              <text-edit @click="useModal().openModal(ModalSistemUpdate)">
                {{ $t("admin_sistem.tab.crud.update.button") }}
              </text-edit>
            </template>
          </list-title>
        </template>

        <template #default>
          <!-- datum  -->
          <list-item>
            <template #title>
              {{ $t("admin_sistem.tab.crud.categories.datum") }}
            </template>
            <template #value>
              {{ useDate(sistemskeSpremenljivke[0]?.datum).isoDate() }}
            </template>
          </list-item>
          <!-- PAGE_SIZE -->
          <list-item>
            <template #title>
              {{ $t("admin_sistem.tab.crud.categories.PAGE_SIZE") }}
            </template>
            <template #value>
              {{ sistemskeSpremenljivke[0]?.PAGE_SIZE }}
            </template>
          </list-item>
          <!-- JAGA_MAX_MEMBERS -->
          <list-item>
            <template #title>
              {{ $t("admin_sistem.tab.crud.categories.JAGA_MAX_MEMBERS") }}
            </template>
            <template #value>
              {{ sistemskeSpremenljivke[0]?.JAGA_MAX_MEMBERS }}
            </template>
          </list-item>
          <!-- OBISK_MAX_LENGTH -->
          <list-item>
            <template #title>
              {{ $t("admin_sistem.tab.crud.categories.OBISK_MAX_LENGTH") }}
            </template>
            <template #value>
              {{ sistemskeSpremenljivke[0]?.OBISK_MAX_LENGTH }}
            </template>
          </list-item>
          <!-- USER_OBISKS_MAX_LENGTH -->
          <list-item>
            <template #title>
              {{
                $t("admin_sistem.tab.crud.categories.USER_OBISKS_MAX_LENGTH")
              }}
            </template>
            <template #value>
              {{ sistemskeSpremenljivke[0]?.USER_OBISKS_MAX_LENGTH }}
            </template>
          </list-item>
        </template>
      </list-container>

      <tab-no-elements :elements="sistemskeSpremenljivke"></tab-no-elements>
    </template>
  </tab-template>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue"

import TabTemplate from "@/components/ui-components/tab/TabTemplate.vue"
import TabHeader from "@/components/ui-components/tab/TabHeader.vue"
import TabNoElements from "@/components/ui-components/tab/TabNoElements.vue"
import ListContainer from "@/components/ui-components/list/ListContainer.vue"
import ListTitle from "@/components/ui-components/list/ListTitle.vue"
import ListItem from "@/components/ui-components/list/ListItem.vue"
import TextEdit from "@/components/ui-components/text/TextEdit.vue"
import ModalSistemUpdate from "@/components/admin/sistem/ModalSistemUpdate.vue"

import { useSistemStore } from "@/stores/admin/useSistemStore"
import { storeToRefs } from "pinia"
import { useDate } from "@/composables/useDate"
import { useModal } from "@/composables/useModal"

// const { openModal } = useModal()
const sistemStore = useSistemStore()
const { sistemskeSpremenljivke } = storeToRefs(sistemStore)
const { fetchMore, refreshPagination } = sistemStore

onBeforeMount(async () => {
  await fetchMore()
})
</script>
