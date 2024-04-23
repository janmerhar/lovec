<template>
  <tab-template :is-refreshable="false">
    <template #header>
      <tab-header>
        {{ $t("zemljevid.tab.header") }}
      </tab-header>
    </template>
    <template #body>
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
                openSheetModal(ModalAdminObiski)
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

        <!-- Fab button(s) -->
        <fab-buttons>
          <ion-fab-button color="tertiary" @click="openModal(ModalRevirAdd)">
            <font-awesome-icon :icon="['fas', 'draw-polygon']" fixed-width />
          </ion-fab-button>

          <ion-fab-button
            color="tertiary"
            @click="openModal(ModalOpazovalnicaAdd)"
          >
            <font-awesome-icon
              :icon="['fas', 'tower-observation']"
              fixed-width
            />
          </ion-fab-button>
        </fab-buttons>
      </map-component>
    </template>
  </tab-template>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia"
import TabTemplate from "@/components/ui-components/tab/TabTemplate.vue"
import TabHeader from "@/components/ui-components/tab/TabHeader.vue"

import { onBeforeMount } from "vue"

import MapComponent from "@/components/zemljevid/MapComponent.vue"
import { IonFabButton } from "@ionic/vue"
import FabButtons from "@/components/FabButtons.vue"
import ModalAdminObiski from "@/components/opazovalnica/ModalAdminObiski.vue"
import ModalOpazovalnicaAdd from "@/components/zemljevid/ModalOpazovalnicaAdd.vue"
import ModalRevirAdd from "@/components/zemljevid/ModalRevirAdd.vue"

import { useModal } from "@/composables/useModal"
import { useOpazovalnicaStore } from "@/stores/useOpazovalnicaStore"
import { useMapElements } from "@/composables/useMapElements"
import { useRevirStore } from "@/stores/useRevirStore"

const { openModal, openSheetModal } = useModal()
const { iconOpazovalnica } = useMapElements()

const opazovalnicaStore = useOpazovalnicaStore()
const { fetchMore, selectItem } = opazovalnicaStore
const { opazovalnice } = storeToRefs(opazovalnicaStore)
const revirStore = useRevirStore()
const { fetchMore: fetchRevirji } = revirStore
const { items: revirji } = storeToRefs(revirStore)

onBeforeMount(async () => {
  await fetchMore()
  await fetchRevirji()
})

import { LMarker, LPolygon, LTooltip } from "@vue-leaflet/vue-leaflet"
</script>
