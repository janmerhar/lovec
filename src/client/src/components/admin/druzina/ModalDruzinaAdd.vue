<template>
  <modal-template>
    <template #header>
      <modal-header
        :confirm-button="true"
        @cancel="useModal().cancelModal"
        @confirm="
          useModal().confirmModal(
            submitForm(
              createItem,
              insertDruzina,
              $t('admin_druzine.tab.crud.create.success', {
                name: insertDruzina.ime,
              })
            )
          )
        "
        >{{ $t("admin_druzine.tab.crud.create.header") }}</modal-header
      >
    </template>
    <!--  -->
    <template #body>
      <Form ref="form" :validation-schema="druzinaAddSchema" @submit.prevent="">
        <input-label-top>
          <template #label>
            {{ $t("admin_druzine.tab.crud.categories.ime") }}
          </template>
          <template #input>
            <Field name="ime" type="text" v-model="insertDruzina.ime" />
          </template>
          <template #error>
            <ErrorMessage name="ime" />
          </template>
        </input-label-top>
      </Form>
    </template>
  </modal-template>
</template>

<script setup lang="ts">
import { ref } from "vue"

import ModalTemplate from "@/components/ui-components/modal/ModalTemplate.vue"
import ModalHeader from "@/components/ui-components/modal/ModalHeader.vue"
import InputLabelTop from "@/components/ui-components/input/InputLabelTop.vue"
import { useModal } from "@/composables/useModal"

import { Form, Field, ErrorMessage } from "vee-validate"
import type { InsertDruzina } from "@/types"
import { druzinaAddSchema } from "@/text-validation/druzinaSchemas"
import { useDruzineStore } from "@/stores/admin/useDruzineStore"
const { createItem } = useDruzineStore()

const insertDruzina = ref<InsertDruzina>({
  ime: "",
})

const form = ref<HTMLFormElement | null>(null)

import { useFormControl } from "@/composables/useFormControl"
const { submitForm } = useFormControl(form)
</script>
