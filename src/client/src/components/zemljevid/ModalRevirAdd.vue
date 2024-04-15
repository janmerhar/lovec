<template>
  <modal-template>
    <template #header>
      <modal-header
        :confirm-button="true"
        @cancel="useModal().cancelModal"
        @confirm="
          submitForm(
            createItem,
            insertRevir,
            $t('admin_revir.crud.create.success', {
              name: insertRevir.ime,
            })
          )
        "
      >
        {{ $t("admin_revir.crud.create.header") }}
      </modal-header>
    </template>
    <!--  -->
    <template #body>
      <map-window-template>
        <map-component
          @center="(e) => (koordinate = e)"
          class="map-component-window"
        >
          <!-- I guess da bom tako potem naredil, da bo lazje -->
          <!-- Ker drugace re ne vem kako bi to naredil... -->
          <!-- TODO: onclick remove marker -->
          <!-- TODO: fix prikaz / zajem koordinat, da bo prvilen -->
          <!-- TODO: odvisen je od zoom-a, bodi pazljiv ko to preverjas v MapComponent -->
          <l-marker
            v-for="koordinate in insertRevir.koordinate"
            :key="koordinate.join()"
            :lat-lng="koordinate"
            :icon="iconOpazovalnica"
          ></l-marker>
        </map-component>
      </map-window-template>

      <!-- TODO: premakni na zemljevid -->
      <button-round @click="insertRevir.koordinate.push(koordinate)"
        >+</button-round
      >
      <Form ref="form" :validation-schema="revirAddSchema">
        <!-- Ime -->
        <input-label-top>
          <template #label>{{
            $t("admin_revir.crud.categories.ime")
          }}</template>
          <template #input>
            <Field name="ime" type="text" v-model="insertRevir.ime" />
          </template>
          <template #error>
            <ErrorMessage name="ime" />
          </template>
        </input-label-top>

        <!-- Druzina -->
        <input-label-top>
          <template #label>{{
            $t("admin_revir.crud.categories.druzina")
          }}</template>
          <template #input>
            <list-item
              v-if="selectedDruzina"
              @click="useModal().openSheetModal(SheetModalDruzinaSelect)"
            >
              <template #title>
                {{ selectedDruzina?.ime }}
              </template>
            </list-item>
            <list-item
              v-else
              @click="useModal().openSheetModal(SheetModalDruzinaSelect)"
            >
              <template #title>{{
                $t("admin_revir.crud.categories.empty")
              }}</template>
            </list-item>
          </template>
        </input-label-top>
      </Form>
    </template>
  </modal-template>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"

import MapComponent from "@/components/zemljevid/MapComponent.vue"
import ModalHeader from "@/components/ui-components/modal/ModalHeader.vue"
import ModalTemplate from "@/components/ui-components/modal/ModalTemplate.vue"
import InputLabelTop from "@/components/ui-components/input/InputLabelTop.vue"
import MapWindowTemplate from "@/components/zemljevid/MapWindowTemplate.vue"
import ButtonRound from "@/components/ui-components/button/ButtonRound.vue"
import ListItem from "@/components/ui-components/list/ListItem.vue"
import SheetModalDruzinaSelect from "@/components/admin/druzina/SheetModalDruzinaSelect.vue"

import { useModal } from "@/composables/useModal"
import { Form, Field, ErrorMessage } from "vee-validate"
import type { InsertRevir } from "@/types"
import { revirAddSchema } from "@/text-validation/revirSchemas"
import { useDruzineStore } from "@/stores/admin/useDruzineStore"
import { useRevirStore } from "@/stores/useRevirStore"

const druzinaStore = useDruzineStore()
const { selectedItem: selectedDruzina } = storeToRefs(druzinaStore)

const revirStore = useRevirStore()
const { createItem } = revirStore

const koordinate = ref<number[]>([])

const getDruzina = computed(() => {
  if (selectedDruzina.value) {
    return selectedDruzina.value.id
  }

  return ""
})

const insertRevir = ref<InsertRevir>({
  ime: "",
  koordinate: [],
  druzina: getDruzina.value,
})

const form = ref<HTMLFormElement | null>(null)

import { useFormControl } from "@/composables/useFormControl"
const { submitForm } = useFormControl(form)
import { LMarker } from "@vue-leaflet/vue-leaflet"

import { useMapElements } from "@/composables/useMapElements"
import { storeToRefs } from "pinia"
const { iconOpazovalnica } = useMapElements()
</script>
