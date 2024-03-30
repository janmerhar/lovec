<template>
  <modal-template>
    <template #header>
      <modal-header
        @cancel="useModal().cancelModal"
        @confirm="useModal().confirmModal"
        >Vnesi dnevnik</modal-header
      >
    </template>
    <datepicker-horizontal class="ion-margin-bottom"></datepicker-horizontal>
    <template #body>
      <Form
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

const insertDnevnik = ref<InsertDnevnik>({
  datum: "2024-03-29",
  delo: "",
  ure: 0,
  opis: "",
})
</script>
