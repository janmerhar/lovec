<template>
  <modal-template>
    <template #header>
      <modal-header
        @cancel="useModal().cancelModal"
        @confirm="useModal().confirmModal"
        :confirm-button="true"
        >blabalbalbj
      </modal-header>
    </template>

    <!--  -->
    <template #body>
      <datepicker-horizontal></datepicker-horizontal>

      <Form
        :validation-schema="opremaAddSchema"
        @submit="useOpremaStore().createItem(insertOprema)"
      >
        <Field name="naziv" type="text" v-model="insertOprema.naziv" />
        <ErrorMessage name="naziv" />
        <br />

        <Field as="select" name="tip" v-model="insertOprema.tip">
          <option v-for="tip in opremaTipDomain" :key="tip" :value="tip">
            {{ tip }}
          </option>
        </Field>
        <ErrorMessage name="tip" />
        <br />

        <Field
          as="textarea"
          name="stanje"
          type="text"
          rows="5"
          v-model="insertOprema.stanje"
        />
        <ErrorMessage name="stanje" />

        <button type="submit">{{ $t("login.tab.input.submit") }}</button>
      </Form>
    </template>
    <!--  -->
  </modal-template>
</template>

<script setup lang="ts">
import { ref } from "vue"

import ModalTemplate from "@/components/ui-components/modal/ModalTemplate.vue"
import ModalHeader from "@/components/ui-components/modal/ModalHeader.vue"
import { useModal } from "@/composables/useModal"

import DatepickerHorizontal from "@/components/ui-components/DatepickerHorizontal.vue"
import { Form, Field, ErrorMessage } from "vee-validate"
import { opremaAddSchema } from "@/text-validation/opremaSchemas"
import { useOpremaStore } from "@/stores/useOpremaStore"
import type { InsertOprema } from "@/types"
import { opremaTipDomain } from "@/types"

const insertOprema = ref<InsertOprema>({
  naziv: "",
  tip: "",
  stanje: "",
  datum: "2024-03-29",
})
</script>
