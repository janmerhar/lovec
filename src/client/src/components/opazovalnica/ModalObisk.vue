<template>
  <sheet-modal-template>
    <template #header>
      <sheet-modal-header>
        <font-awesome-icon
          :icon="['fas', 'bed']"
          v-if="selectedItem?.prespanje || true"
        />
        {{ selectedItem.ime }}
      </sheet-modal-header>
    </template>

    <!--  -->
    <template #body>
      <list-container>
        <template #title>
          <list-title>
            <template #default>
              {{ $t("obisk.tab.sections.zasedenost") }}
            </template>
            <template #end>
              {{
                obiski.filter((obiskMap) =>
                  useDate(new Date()).isLessThan(obiskMap.konec)
                )?.length
              }}
              / {{ selectedItem?.kapaciteta }}</template
            >
          </list-title>
        </template>
        <template #default>
          <!-- Active reservations -->
          <template
            v-for="obisk in obiski.filter((obiskMap) =>
              useDate(new Date()).isLessThan(obiskMap.konec)
            )"
            :key="obisk.id"
          >
            <list-item>
              <template #title>
                <!-- Spremni v ikonce -->
                {{ obisk.uporabnik.ime }} {{ obisk.uporabnik.priimek }}
              </template>
              <template #value>
                {{ useDate(obisk.zacetek).getTime() }}
              </template>
            </list-item>
          </template>
          <!-- Showing user join button only when there's enough space -->
          <list-item
            v-if="obiski?.length < selectedItem?.kapaciteta && !activeObisk"
            style="padding: 0"
          >
            <template #title>
              <div
                style="
                  padding: 1rem 0.5rem;
                  color: var(--ion-background-color-step-600);
                "
              >
                {{ uporabnik?.ime }} {{ uporabnik?.priimek }}
              </div>
            </template>
            <template #value>
              <button-round color="success" @click="enterOpazovalnica">
                <font-awesome-icon
                  :icon="['fas', 'right-to-bracket']"
                  fixed-width
                />
              </button-round>
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
import { storeToRefs } from "pinia"

import SheetModalTemplate from "@/components/ui-components/modal/SheetModalTemplate.vue"
import SheetModalHeader from "@/components/ui-components/modal/SheetModalHeader.vue"

import ListContainer from "@/components/ui-components/list/ListContainer.vue"
import ListTitle from "@/components/ui-components/list/ListTitle.vue"
import ListItem from "@/components/ui-components/list/ListItem.vue"
import ButtonRound from "@/components/ui-components/button/ButtonRound.vue"

import { useDate } from "@/composables/useDate"
import { useOpazovalnicaStore } from "@/stores/useOpazovalnicaStore"
import { useObiskStore } from "@/stores/useObiskStore"
import { useLoginStore } from "@/stores/useLoginStore"
import { useActiveObiskStore } from "@/stores/useActiveObiskStore"
import type { Opazovalnica } from "@/types"

const opazovalnicaStore = useOpazovalnicaStore()
const { selectedItem } = storeToRefs(opazovalnicaStore)
const obiskStore = useObiskStore()
const { refreshPagination } = obiskStore
const { obiski } = storeToRefs(obiskStore)
const loginStore = useLoginStore()
const { uporabnik } = storeToRefs(loginStore)
const activeObiskStore = useActiveObiskStore()
const { fetchItem: fetchActiveObisk, startObisk } = activeObiskStore
const { selectedItem: activeObisk } = storeToRefs(activeObiskStore)

onBeforeMount(async () => {
  await refreshPagination()
  await fetchActiveObisk()
})

const enterOpazovalnica = async () => {
  await startObisk(selectedItem.value as Opazovalnica)

  await refreshPagination()
}
</script>
