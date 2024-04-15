<template>
  <tab-template :refresh="refreshPagination" :scroll="fetchMore">
    <template #header>
      <tab-header>
        {{ $t("admin_zemljevid_obiski.tab.header") }}
        {{ selectedOpazovalnica?.ime }}
      </tab-header>
    </template>
    <template #body>
      <datepicker-horizontal
        @change="(datum: string) => selectItem(datum)"
      ></datepicker-horizontal>

      <list-container v-if="items.length > 0">
        <template #title>
          <list-title>
            {{ $t("admin_zemljevid_obiski.tab.sections.obiski") }}
          </list-title>
        </template>
        <template #default>
          <list-item
            v-for="obisk in items"
            :key="obisk.id"
            @click="
              redirectTo('admin_uporabnik_id', { id: obisk.uporabnik.id })
            "
          >
            <template #title>
              {{ obisk.uporabnik.ime }} {{ obisk.uporabnik.priimek }}</template
            >
            <template #value>
              {{ useDate(obisk.zacetek).getTime() }}
              <!-- Presenting end time or delete button in case the visit has finished -->
              <template v-if="!useDate(new Date()).isLessThan(obisk.konec)">
                - {{ useDate(obisk.konec).getTime() }}
                <list-item-button color="danger" @click.stop="deleteItem(obisk)"
                  ><font-awesome-icon
                    :icon="['fas', 'user-minus']"
                    fixed-width
                  />
                </list-item-button>
              </template>
            </template>
          </list-item>
        </template>
      </list-container>

      <tab-no-elements :elements="items"></tab-no-elements>
    </template>
  </tab-template>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue"
import { storeToRefs } from "pinia"
import { useOpazovalnicaStore } from "@/stores/useOpazovalnicaStore"
import { useObiskiStore } from "@/stores/admin/useObiskiStore"

import DatepickerHorizontal from "@/components/ui-components/DatepickerHorizontal.vue"
import TabTemplate from "@/components/ui-components/tab/TabTemplate.vue"
import TabHeader from "@/components/ui-components/tab/TabHeader.vue"
import TabNoElements from "@/components/ui-components/tab/TabNoElements.vue"
import ListContainer from "@/components/ui-components/list/ListContainer.vue"
import ListTitle from "@/components/ui-components/list/ListTitle.vue"
import ListItem from "@/components/ui-components/list/ListItem.vue"
import ListItemButton from "@/components/ui-components/list/ListItemButton.vue"

import { useTabNavigation } from "@/composables/useTabNavigation"
import { useDate } from "@/composables/useDate"
const opazovalnicaStore = useOpazovalnicaStore()
const { selectedItem: selectedOpazovalnica } = storeToRefs(opazovalnicaStore)
const obiskiStore = useObiskiStore()
const { fetchMore, refreshPagination, selectItem, deleteItem } = obiskiStore
const { items } = storeToRefs(obiskiStore)
const { redirectTo } = useTabNavigation()

onBeforeMount(async () => {
  await fetchMore()
})
</script>
