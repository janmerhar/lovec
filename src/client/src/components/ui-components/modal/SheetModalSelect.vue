<template>
  <sheet-modal-template :scroll="fetchMore">
    <template #header>
      <sheet-modal-header>
        {{ header }}
      </sheet-modal-header>
    </template>

    <!--  -->
    <template #body>
      <list-container>
        <template #default>
          <list-item
            v-for="item in items"
            :key="item"
            @click="
              () => {
                selectItem(item)
                cancelModal()
              }
            "
          >
            <template #title>
              {{ displayItem(item) }}
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

import { useModal } from "@/composables/useModal"

/*
  Modal funkcije:
  - items: T

  - fetchMore(): Promise<any[]>
  -- Fetcha seznam elementov, ki jih želimo prikazati v modalu

  - isSearchable(): boolean
  - searchMore(query: string, filters?: object): Promise<any[]>
  -- V primeru, da imamo search bar in/ali filtre potem uporabimo to funkcijo

  - selectItem(item: any): any
  -- tukaj se shrani izbran element

  - refresh(): Promise<any[]>
*/

const props = defineProps({
  header: {
    type: String,
    default: "",
  },
  items: {
    type: Array,
    required: true,
  },
  displayItem: {
    type: Function,
    default: (el: any) => el,
  },
  fetchMore: {
    type: Function,
    default: () => [],
  },
  selectItem: {
    type: Function,
    default: (el?: any) => null,
  },
})

const { cancelModal } = useModal()

onBeforeMount(async () => {
  await props.fetchMore()
})
</script>
