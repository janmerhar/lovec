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
        <input-label-top>
          <template #label>
            {{ $t("oprema.crud.categories.naziv") }}
          </template>
          <template #input>
            <Field name="naziv" type="text" v-model="insertOprema.naziv" />
          </template>
          <template #error>
            <ErrorMessage name="naziv" />
          </template>
        </input-label-top>

        <input-label-top>
          <template #label>
            {{ $t("oprema.crud.categories.tip") }}
          </template>
          <template #input>
            <Field as="select" name="tip" v-model="insertOprema.tip">
              <option v-for="tip in opremaTipDomain" :key="tip" :value="tip">
                {{ tip }}
              </option>
            </Field>
          </template>
          <template #error>
            <ErrorMessage name="tip" />
          </template>
        </input-label-top>

        <input-label-top>
          <template #label>
            {{ $t("oprema.crud.categories.stanje") }}
          </template>
          <template #input>
            <Field
              as="textarea"
              name="stanje"
              type="text"
              rows="5"
              v-model="insertOprema.stanje"
            />
          </template>
          <template #error>
            <ErrorMessage name="stanje" />
          </template>
        </input-label-top>
      </Form>
    </template>
    <!--  -->
  </modal-template>
</template>

<script setup lang="ts">
import { ref } from "vue"

import ModalTemplate from "@/components/ui-components/modal/ModalTemplate.vue"
import ModalHeader from "@/components/ui-components/modal/ModalHeader.vue"
import InputLabelTop from "@/components/ui-components/input/InputLabelTop.vue"
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
