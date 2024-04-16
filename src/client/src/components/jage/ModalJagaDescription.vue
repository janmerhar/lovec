<template>
  <modal-template>
    <template #header>
      <modal-header @cancel="useModal().cancelModal">
        {{ $t("jaga.tab.header") }}
      </modal-header>
    </template>

    <!--  -->
    <template #body>
      <!-- Lokacija -->
      <map-window-template>
        <map-component class="map-component-window">
          <!-- l-marker -->
          <l-marker
            :lat-lng="selectedJaga?.lokacija[0]"
            :icon="iconJaga"
          ></l-marker>
        </map-component>
      </map-window-template>

      <!-- Opis -->
      <list-container>
        <template #title>
          <list-title>
            {{ $t("jaga.crud.categories.opis") }}
          </list-title>
        </template>
        <template #default>
          <list-item>
            <template #title>
              {{ $t("jaga.crud.categories.zacetek") }}
            </template>
            <template #value>
              {{ useDate(selectedJaga?.zacetek).isoDate() }}
              {{ useDate(selectedJaga?.zacetek).getTime() }}
            </template>
          </list-item>
          <list-item>
            <template #title>
              {{ $t("jaga.crud.categories.opis") }}
            </template>
            <template #value>
              {{ selectedJaga?.opis }}
            </template>
          </list-item>
        </template>
      </list-container>

      <!-- Udelezenci -->
      <list-container>
        <template #title>
          <list-title>
            <template #default>
              {{ $t("jaga.crud.categories.udelezeni") }}
            </template>
            <template #end>
              {{ selectedJaga?.udelezeni.length }} /
              {{ selectedJaga?.maxUdelezeni }}</template
            >
          </list-title>
        </template>
        <template #default>
          <list-item>
            <template #title>{{
              $t("jaga.crud.categories.organizator")
            }}</template>
            <template #value>
              {{ selectedJaga?.organizator.ime }}
              {{ selectedJaga?.organizator.priimek }}</template
            >
          </list-item>

          <list-item
            v-for="udelezeni in selectedJaga?.udelezeni"
            :key="udelezeni.id"
          >
            <template #title>
              {{ udelezeni.ime }}
              {{ udelezeni.priimek }}
            </template>
            <template #value>
              <!-- TODO: naredi remove klic -->
              <list-item-button color="danger" @click.stop="() => {}"
                ><font-awesome-icon :icon="['fas', 'user-minus']" fixed-width />
              </list-item-button>
            </template>
          </list-item>

          <!-- Join / leave button -->
          <list-item style="padding: 0">
            <template #title>
              <div
                style="padding: 1rem 0.5rem; color: var(--ion-color-step-600)"
              >
                {{ uporabnik?.ime }} {{ uporabnik?.priimek }}
              </div>
            </template>
            <template #value>
              <!-- TODO: implementiraj join -->
              <!-- Join jaga -->
              <button-round
                v-if="
                  selectedJaga?.udelezeni.length < selectedJaga?.maxUdelezeni
                "
                color="success"
                @click="() => {}"
              >
                <font-awesome-icon
                  :icon="['fas', 'right-to-bracket']"
                  fixed-width
                />
              </button-round>
              <!-- TODO: implementiraj join jaga -->
              <!-- Leave Jaga -->
              <button-round v-else color="danger" @click="() => {}">
                <font-awesome-icon :icon="['fas', 'user-minus']" fixed-width />
              </button-round>
            </template>
          </list-item>
        </template>
      </list-container>
    </template>
    <!--  -->
  </modal-template>
</template>

<script setup lang="ts">
import ModalTemplate from "@/components/ui-components/modal/ModalTemplate.vue"
import ModalHeader from "@/components/ui-components/modal/ModalHeader.vue"
import MapComponent from "@/components/zemljevid/MapComponent.vue"
import MapWindowTemplate from "@/components/zemljevid/MapWindowTemplate.vue"
import ListContainer from "@/components/ui-components/list/ListContainer.vue"
import ListTitle from "@/components/ui-components/list/ListTitle.vue"
import ListItem from "@/components/ui-components/list/ListItem.vue"
import ListItemButton from "@/components/ui-components/list/ListItemButton.vue"
import ButtonRound from "@/components/ui-components/button/ButtonRound.vue"

import { useModal } from "@/composables/useModal"
import { LMarker } from "@vue-leaflet/vue-leaflet"
import { useMapElements } from "@/composables/useMapElements"

import { useJagaStore } from "@/stores/useJagaStore"
import { storeToRefs } from "pinia"
import { useDate } from "@/composables/useDate"
import { useLoginStore } from "@/stores/useLoginStore"
const jagaStore = useJagaStore()
const { selectedJaga } = storeToRefs(jagaStore)
const loginStore = useLoginStore()
const { uporabnik } = storeToRefs(loginStore)

const { iconJaga } = useMapElements()
</script>
