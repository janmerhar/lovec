<template>
  <modal-template>
    <template #header>
      <modal-header
        :confirm-button="true"
        @cancel="useModal().cancelModal"
        @confirm="
          submitForm(
            useJagaStore().createItem,
            insertJaga,
            $t('jaga.crud.create.success', { name: insertJaga.naziv })
          )
        "
      >
        {{ $t("jaga.crud.create.header") }}
      </modal-header>
    </template>

    <template #body>
      <map-window-template>
        <map-component
          @center="(e) => (insertJaga.lokacija = e)"
          class="map-component-window"
        ></map-component>
      </map-window-template>

      <datepicker-horizontal
        @change="(novDatum) => (datum = novDatum)"
      ></datepicker-horizontal>
      <!--  -->

      <Form ref="form" :validation-schema="jagaAddSchema">
        <!-- NAZIV -->
        <input-label-top>
          <template #label>{{ $t("jaga.crud.categories.naziv") }}</template>
          <template #input>
            <Field name="naziv" type="text" v-model="insertJaga.naziv" />
          </template>
          <template #error>
            <ErrorMessage name="naziv" />
          </template>
        </input-label-top>
        <!-- OPIS -->
        <input-label-top>
          <template #label>
            {{ $t("jaga.crud.categories.opis") }}
          </template>
          <template #input>
            <Field
              as="textarea"
              name="opis"
              type="text"
              rows="5"
              v-model="insertJaga.opis"
            />
          </template>
          <template #error>
            <ErrorMessage name="opis" />
          </template>
        </input-label-top>
        <!-- CAS -->
        <input-label-top>
          <template #label>{{ $t("jaga.crud.categories.zacetek") }}</template>
          <template #input>
            <Field name="banan" type="time" v-model="cas" />
          </template>
          <template #error>
            <ErrorMessage name="banan" />
          </template>
        </input-label-top>
      </Form>
      <!--  -->
    </template>
  </modal-template>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"

import MapComponent from "@/components/zemljevid/MapComponent.vue"
import MapWindowTemplate from "@/components/zemljevid/MapWindowTemplate.vue"
import ModalTemplate from "@/components/ui-components/modal/ModalTemplate.vue"
import ModalHeader from "@/components/ui-components/modal/ModalHeader.vue"
import DatepickerHorizontal from "@/components/ui-components/DatepickerHorizontal.vue"
import InputLabelTop from "@/components/ui-components/input/InputLabelTop.vue"
import { Form, Field, ErrorMessage } from "vee-validate"

import { useModal } from "@/composables/useModal"
import { InsertJaga } from "@/types"
import { useDate } from "@/composables/useDate"
import { jagaAddSchema } from "@/text-validation/jagaSchema"
import { useJagaStore } from "@/stores/useJagaStore"

const datum = ref<string>(useDate(new Date()).isoDate())
const cas = ref<string>(new Date().toTimeString().slice(0, 5))

const datetime = computed(() => {
  const { date, addHours } = useDate(new Date(`${datum.value}T${cas.value}`))

  addHours(2)

  return date.value.toISOString()
})

const insertJaga = ref<InsertJaga>({
  naziv: "",
  opis: "",
  // TODO: zemljevid
  lokacija: [],
  zacetek: datetime.value,
})

const form = ref<HTMLFormElement | null>(null)
import { useFormControl } from "@/composables/useFormControl"
const { submitForm } = useFormControl(form)
</script>
