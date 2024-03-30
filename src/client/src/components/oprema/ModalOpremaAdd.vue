<template>
  <modal-template>
    <template #header>
      <modal-header
        :confirm-button="true"
        @cancel="useModal().cancelModal"
        @confirm="
          submitForm(
            useOpremaStore().createItem,
            insertOprema,
            $t('oprema.crud.create.success', { name: insertOprema.naziv })
          )
        "
      >
        {{ $t("oprema.crud.create.header") }}
      </modal-header>
    </template>

    <!--  -->
    <template #body>
      <Form ref="form" :validation-schema="opremaAddSchema">
        <Field name="naziv" type="text" v-model="insertOprema.naziv" />
        <ErrorMessage name="naziv" />
        <br />

        <div>
          <Field as="select" name="tip" v-model="insertOprema.tip">
            <option v-for="tip in opremaTipDomain" :key="tip" :value="tip">
              {{ tip }}
            </option>
          </Field>
          <ErrorMessage name="tip" />
        </div>
        <br />

        <Field
          as="textarea"
          name="stanje"
          type="text"
          rows="5"
          v-model="insertOprema.stanje"
        />
        <ErrorMessage name="stanje" />
      </Form>
      <button type="submit">{{ $t("oprema.crud.create.button") }}</button>
    </template>
    <!--  -->
  </modal-template>
</template>

<script setup lang="ts">
import { ref } from "vue"

import ModalTemplate from "@/components/ui-components/modal/ModalTemplate.vue"
import ModalHeader from "@/components/ui-components/modal/ModalHeader.vue"
import { useModal } from "@/composables/useModal"

import { Form, Field, ErrorMessage } from "vee-validate"
import { opremaAddSchema } from "@/text-validation/opremaSchemas"
import { useOpremaStore } from "@/stores/useOpremaStore"
import type { InsertOprema } from "@/types"
import { opremaTipDomain } from "@/types"

const insertOprema = ref<InsertOprema>({
  naziv: "",
  tip: "",
  stanje: "",
})

const form = ref<HTMLFormElement | null>(null)

import { useFormControl } from "@/composables/useFormControl"
const { submitForm } = useFormControl(form)
</script>
