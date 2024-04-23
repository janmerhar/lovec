<template>
  <modal-template>
    <template #header>
      <modal-header
        :confirm-button="true"
        @cancel="useModal().cancelModal"
        @confirm="
          submitForm(
            async (newVal: InsertSistemskeSpremenljivke) => {
              return await updateItem(sistemskeSpremenljivke[0], newVal)
            },
            insertSistemskeSpremenljivke,
            $t('admin_sistem.tab.crud.update.success')
          )
        "
      >
        {{ $t("admin_sistem.tab.crud.update.header") }}
      </modal-header>
    </template>

    <template #body>
      <Form
        ref="form"
        :validation-schema="sistemskeSpremenljivkeAddSchema"
        :values="sistemskeSpremenljivke[0]"
      >
        <!-- PAGE_SIZE -->
        <input-label-top>
          <template #label>
            {{ $t("admin_sistem.tab.crud.categories.PAGE_SIZE") }}
          </template>
          <template #input>
            <Field
              name="PAGE_SIZE"
              type="number"
              :initialValue="sistemskeSpremenljivke[0]?.PAGE_SIZE"
              v-model="insertSistemskeSpremenljivke.PAGE_SIZE"
            />
          </template>
          <template #error>
            <ErrorMessage name="PAGE_SIZE" />
          </template>
        </input-label-top>
        <!-- JAGA_MAX_MEMBERS -->

        <input-label-top>
          <template #label>
            {{ $t("admin_sistem.tab.crud.categories.JAGA_MAX_MEMBERS") }}
          </template>
          <template #input>
            <Field
              name="JAGA_MAX_MEMBERS"
              type="number"
              :initialValue="sistemskeSpremenljivke[0]?.JAGA_MAX_MEMBERS"
              v-model="insertSistemskeSpremenljivke.JAGA_MAX_MEMBERS"
            />
          </template>
          <template #error>
            <ErrorMessage name="JAGA_MAX_MEMBERS" />
          </template>
        </input-label-top>

        <!-- OBISK_MAX_LENGTH -->

        <input-label-top>
          <template #label>
            {{ $t("admin_sistem.tab.crud.categories.OBISK_MAX_LENGTH") }}
          </template>
          <template #input>
            <Field
              name="OBISK_MAX_LENGTH"
              type="number"
              :initialValue="sistemskeSpremenljivke[0]?.OBISK_MAX_LENGTH"
              v-model="insertSistemskeSpremenljivke.OBISK_MAX_LENGTH"
            />
          </template>
          <template #error>
            <ErrorMessage name="OBISK_MAX_LENGTH" />
          </template>
        </input-label-top>

        <!-- USER_OBISKS_MAX_LENGTH -->

        <input-label-top>
          <template #label>
            {{ $t("admin_sistem.tab.crud.categories.USER_OBISKS_MAX_LENGTH") }}
          </template>
          <template #input>
            <Field
              name="USER_OBISKS_MAX_LENGTH"
              type="number"
              :initialValue="sistemskeSpremenljivke[0]?.USER_OBISKS_MAX_LENGTH"
              v-model="insertSistemskeSpremenljivke.USER_OBISKS_MAX_LENGTH"
            />
          </template>
          <template #error>
            <ErrorMessage name="USER_OBISKS_MAX_LENGTH" />
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
import type { InsertSistemskeSpremenljivke } from "@/types"

import { Form, Field, ErrorMessage } from "vee-validate"
import { sistemskeSpremenljivkeAddSchema } from "@/text-validation/sistemSchemas"
import { useSistemStore } from "@/stores/admin/useSistemStore"
import { storeToRefs } from "pinia"

const sistemStore = useSistemStore()
const { sistemskeSpremenljivke } = storeToRefs(sistemStore)
const { updateItem } = sistemStore

const form = ref<HTMLFormElement | null>(null)

const insertSistemskeSpremenljivke = ref<InsertSistemskeSpremenljivke>({
  PAGE_SIZE: sistemskeSpremenljivke.value[0]?.PAGE_SIZE,
  JAGA_MAX_MEMBERS: sistemskeSpremenljivke.value[0]?.JAGA_MAX_MEMBERS,
  OBISK_MAX_LENGTH: sistemskeSpremenljivke.value[0]?.OBISK_MAX_LENGTH,
  USER_OBISKS_MAX_LENGTH:
    sistemskeSpremenljivke.value[0]?.USER_OBISKS_MAX_LENGTH,
})
import { useFormControl } from "@/composables/useFormControl"
const { submitForm } = useFormControl(form)
</script>
