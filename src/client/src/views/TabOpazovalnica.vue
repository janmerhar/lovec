<template>
  <tab-template :is-refreshable="false">
    <template #header>
      <tab-header>
        {{ $t("zemljevid.tab.header") }}
      </tab-header>
    </template>
    <template #body>
      <!-- Uporabnik -->
      <!-- Upgrade activeObisk tako, da vidis, ce je ze potekel in ga potem ne prikazes -->
      <div
        v-if="activeObisk && useDate(new Date()).isLessThan(activeObisk.konec)"
        style="
          display: flex;
          justify-content: space-between;
          padding-left: 12px;
          padding-right: 12px;
          padding-top: 6px;
          position: absolute;
          z-index: 100;
          width: 100vw;
        "
      >
        <button-oval
          @click="
            () => {
              selectItem(activeObisk?.opazovalnica as Opazovalnica)
              openSheetModal(ModalObisk)
            }
          "
          ><font-awesome-icon
            style="/*margin-right: 8px*/"
            :icon="['fas', 'tower-observation']"
            fixed-width
          />
          <!-- TODO: fix timer -->
          <!-- {{ useCountdown(activeObisk?.zacetek).timer }} -->
        </button-oval>

        <!-- TODO: koncaj obisk on click -->
        <button-oval color="danger" @click="endActiveObisk">
          <!-- TODO: translations -->
          Zapusti
          <font-awesome-icon
            style="margin-left: 8px"
            :icon="['fas', 'right-from-bracket']"
            fixed-width
          />
        </button-oval>
      </div>

      <map-component
        style="height: 100%; width: 100%; position: relative; z-index: 1"
      >
        <!-- Opazovalnice -->
        <template v-for="opazovalnica in opazovalnice" :key="opazovalnica.id">
          <l-marker
            :lat-lng="opazovalnica.koordinate"
            :icon="iconOpazovalnica"
            @click="
              () => {
                selectItem(opazovalnica)
                openSheetModal(ModalObisk)
              }
            "
          ></l-marker>
        </template>

        <!-- Revirji -->
        <template v-for="revir in revirji" :key="revir.id">
          <l-polygon
            :lat-lngs="revir.koordinate"
            :color="'red'"
            :name="revir.ime"
          >
            <l-tooltip :options="{ permanent: true, opacity: 0.7 }">
              {{ revir.ime }}
            </l-tooltip>
          </l-polygon>
        </template>
      </map-component>
    </template>
  </tab-template>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia"
import TabTemplate from "@/components/ui-components/tab/TabTemplate.vue"
import TabHeader from "@/components/ui-components/tab/TabHeader.vue"
import ButtonOval from "@/components/ui-components/button/ButtonOval.vue"

import { onBeforeMount } from "vue"

import MapComponent from "@/components/zemljevid/MapComponent.vue"
import ModalObisk from "@/components/opazovalnica/ModalObisk.vue"

import { useModal } from "@/composables/useModal"
import { useOpazovalnicaStore } from "@/stores/useOpazovalnicaStore"
import { useMapElements } from "@/composables/useMapElements"
import { useRevirStore } from "@/stores/useRevirStore"
import { useActiveObiskStore } from "@/stores/useActiveObiskStore"
import { useDate } from "@/composables/useDate"

const { openSheetModal } = useModal()
const { iconOpazovalnica } = useMapElements()

const opazovalnicaStore = useOpazovalnicaStore()
const { fetchMore, selectItem } = opazovalnicaStore
const { opazovalnice } = storeToRefs(opazovalnicaStore)
const revirStore = useRevirStore()
const { fetchMore: fetchRevirji } = revirStore
const { items: revirji } = storeToRefs(revirStore)
const activeObiskStore = useActiveObiskStore()
const { fetchItem: fetchActiveObisk, deselectItem: endActiveObisk } =
  activeObiskStore
const { selectedItem: activeObisk } = storeToRefs(activeObiskStore)

onBeforeMount(async () => {
  await fetchMore()
  await fetchRevirji()
  await fetchActiveObisk()
})

import { LMarker, LPolygon, LTooltip } from "@vue-leaflet/vue-leaflet"
import { Opazovalnica } from "@/types"
</script>
