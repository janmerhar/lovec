<template>
  <modal-template>
    <template #header>
      <modal-header
        @cancel="useModal().cancelModal"
        @confirm="
          submitForm(
            usePripravnikDnevnikStore().createItem,
            insertDnevnik,
            $t('pripravniki.dnevnik.crud.create.success', {
              name: insertDnevnik.delo,
            })
          )
        "
        >Vnesi dnevnik</modal-header
      >
    </template>
    <template #body>
      <datepicker-horizontal
        @change="(datum) => (insertDnevnik.datum = datum)"
        class="ion-margin-bottom"
      ></datepicker-horizontal>
      <Form
        ref="form"
        :validation-schema="dnevnikAddSchema"
        @submit="usePripravnikDnevnikStore().createItem(insertDnevnik)"
      >
        <Field as="select" name="delo" v-model="insertDnevnik.delo">
          <option v-for="delo in deloDomain" :key="delo" :value="delo">
            {{ delo }}
          </option>
        </Field>
        <ErrorMessage name="delo" />
        <br />

        <Field name="ure" type="number" v-model="insertDnevnik.ure" />
        <ErrorMessage name="ure" />
        <br />

        <Field
          as="textarea"
          name="opis"
          type="text"
          rows="5"
          v-model="insertDnevnik.opis"
        />
        <ErrorMessage name="opis" />
        <br />

        <button type="submit">
          {{ $t("pripravniki.crud.create.button") }}
        </button>
      </Form>
    </template>
  </modal-template>
</template>

<script setup lang="ts">
import { ref } from "vue"

import DatepickerHorizontal from "@/components/ui-components/DatepickerHorizontal.vue"

import ModalTemplate from "@/components/ui-components/modal/ModalTemplate.vue"
import ModalHeader from "@/components/ui-components/modal/ModalHeader.vue"
import { useModal } from "@/composables/useModal"
import { Form, Field, ErrorMessage } from "vee-validate"

import { dnevnikAddSchema } from "@/text-validation/dnevnikSchemas"
import type { InsertDnevnik } from "@/types"
import { deloDomain } from "@/types"
import { usePripravnikDnevnikStore } from "@/stores/usePripravnikDnevnikStore"
import { useDate } from "../../composables/useDate"

const insertDnevnik = ref<InsertDnevnik>({
  datum: useDate(new Date()).isoDate(),
  delo: "",
  ure: 0,
  opis: "",
})

const form = ref<HTMLFormElement | null>(null)

import { useFormControl } from "@/composables/useFormControl"
const { submitForm } = useFormControl(form)
</script>
