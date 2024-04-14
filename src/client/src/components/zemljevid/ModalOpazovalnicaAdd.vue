<template>
  <modal-template>
    <template #header>
      <modal-header
        :confirm-button="true"
        @cancel="useModal().cancelModal"
        @confirm="
          submitForm(
            createItem,
            insertOpazovalnica,
            $t('admin_opazovalnica.crud.create.success', {
              name: insertOpazovalnica.ime,
            })
          )
        "
      >
        {{ $t("admin_opazovalnica.crud.create.header") }}
      </modal-header>
    </template>
    <!--  -->
    <template #body>
      <map-window-template>
        <map-component
          @center="(e) => (insertOpazovalnica.koordinate = e)"
          class="map-component-window"
        ></map-component>
      </map-window-template>

      <Form ref="form" :validation-schema="opazovalnicaAddSchema">
        <!-- Ime -->
        <input-label-top>
          <template #label>{{
            $t("admin_opazovalnica.crud.categories.ime")
          }}</template>
          <template #input>
            <Field name="ime" type="text" v-model="insertOpazovalnica.ime" />
          </template>
          <template #error>
            <ErrorMessage name="ime" />
          </template>
        </input-label-top>

        <!-- Kapaciteta -->
        <input-label-top>
          <template #label>{{
            $t("admin_opazovalnica.crud.categories.kapaciteta")
          }}</template>
          <template #input>
            <Field
              name="kapaciteta"
              type="number"
              v-model="insertOpazovalnica.kapaciteta"
            />
          </template>
          <template #error>
            <ErrorMessage name="kapaciteta" />
          </template>
        </input-label-top>

        <!-- Kapaciteta -->
        <input-label-top>
          <template #label
            >{{ $t("admin_opazovalnica.crud.categories.prespanje") }}
            <Field
              name="prespanje"
              type="checkbox"
              :value="true"
              :unchecked-value="false"
              v-model="insertOpazovalnica.prespanje"
            />
          </template>
          <template #input> </template>
          <template #error>
            <ErrorMessage name="prespanje" />
          </template>
        </input-label-top>
        <!--  -->
      </Form>
    </template>
  </modal-template>
</template>

<script setup lang="ts">
import { ref } from "vue"

import MapComponent from "@/components/zemljevid/MapComponent.vue"
import ModalHeader from "@/components/ui-components/modal/ModalHeader.vue"
import ModalTemplate from "@/components/ui-components/modal/ModalTemplate.vue"
import InputLabelTop from "@/components/ui-components/input/InputLabelTop.vue"
import MapWindowTemplate from "@/components/zemljevid/MapWindowTemplate.vue"
import { useModal } from "@/composables/useModal"

import { Form, Field, ErrorMessage } from "vee-validate"
import type { InsertOpazovalnica } from "@/types"
import { opazovalnicaAddSchema } from "@/text-validation/opazovalnicaSchemas"
import { useOpazovalnicaStore } from "@/stores/useOpazovalnicaStore"
const { createItem } = useOpazovalnicaStore()

const insertOpazovalnica = ref<InsertOpazovalnica>({
  ime: "",
  kapaciteta: 0,
  prespanje: false,
  koordinate: [],
})

const form = ref<HTMLFormElement | null>(null)

import { useFormControl } from "@/composables/useFormControl"
const { submitForm } = useFormControl(form)
</script>
